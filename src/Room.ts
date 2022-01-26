import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "./firebase/db";
import { deleteAllItems } from "./Item";

export type RoomID = string;

const colorNames = ["textColor", "borderColor1", "borderColor2"] as const;

export type ColorName = typeof colorNames[number];

export type RoomData = {
  title?: string;

  selectedIndex?: number;
  horizontal?: "left" | "center" | "right";
  vertical?: "top" | "center" | "bottom";

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
} & {
  [key in ColorName]?: string;
};

export type Room = {
  id: RoomID;
  data?: RoomData;
};

export const createInitialRoomData = (): RoomData => ({
  title: "My Room",
  selectedIndex: 0,
  horizontal: "right",
  vertical: "bottom",
  textColor: "#F44336",
  borderColor1: "#ffffff",
  borderColor2: "#222222",
});

export const createRoom = async (): Promise<RoomID> => {
  const d = createInitialRoomData();
  const r = await addDoc(collection(db, "rooms"), {
    ...d,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return r.id;
};

export const useCreateRoom = (): (() => Promise<void>) => {
  const router = useRouter();
  return async () => {
    const id = await createRoom();
    router.push({ pathname: "./room", query: { id } });
  };
};

export const updateRoom = async (
  id: RoomID | undefined,
  d: RoomData
): Promise<void> => {
  if (id == null) return;

  await updateDoc(doc(db, "rooms", id), {
    ...d,
    updatedAt: serverTimestamp(),
  });
};

export const useUpdateCurrentRoom = (): ((d: RoomData) => Promise<void>) => {
  const id = useCurrentRoomID();
  return (d) => updateRoom(id, d);
};

export const useRoom = (id: RoomID | undefined): Room | undefined => {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (id == null) return;
    return onSnapshot(doc(db, "rooms", id), (s) =>
      setRoom({ id, data: s.data() as RoomData })
    );
  }, [id]);

  return room;
};

export const useCurrentRoomID = (): RoomID | undefined => {
  const r = useRouter();
  const id = r.query.id;
  return Array.isArray(id) ? id[0] : id;
};

export const useCurrentRoom = (): Room | undefined => {
  const id = useCurrentRoomID();
  const room = useRoom(id);
  return room;
};

export const deleteRoom = async (id: RoomID | undefined) => {
  if (id == null) return;

  await deleteDoc(doc(db, "rooms", id));
};

export const useDeleteCurrentRoom = (): (() => Promise<void>) => {
  const r = useRouter();
  const id = useCurrentRoomID();
  return async () => {
    await deleteAllItems(id);
    await deleteRoom(id);
    r.replace("/");
  };
};
