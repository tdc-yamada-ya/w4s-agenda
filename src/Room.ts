import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "./firebase/db";

export type RoomID = string;

export type RoomData = {
  selectedIndex?: number;
  horizontal?: "left" | "center" | "right";
  vertical?: "top" | "center" | "bottom";
};

export type Room = {
  id: RoomID;
  data?: RoomData;
};

export const createDefaultRoomData = (): RoomData => ({
  selectedIndex: 0,
  horizontal: "right",
  vertical: "bottom",
});

export const createRoom = async (): Promise<RoomID> => {
  const d = createDefaultRoomData();
  const r = await addDoc(collection(db, "rooms"), {
    ...d,
    createdAt: serverTimestamp(),
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

  await updateDoc(doc(db, "rooms", id), d);
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
