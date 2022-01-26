import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase/db";
import { RoomID, useCurrentRoom, useCurrentRoomID } from "./Room";

export type ItemID = {
  parentID: RoomID;
  id: string;
};

export type ItemData = {
  index?: number;
  title?: string;
};

export type Item = {
  id: ItemID;
  data?: ItemData;
};

export const deleteItem = (id: ItemID) =>
  deleteDoc(doc(db, "rooms", id.parentID, "items", id.id));

export const deleteAllItems = async (id: RoomID | undefined) => {
  if (id == null) return;

  (await getDocs(collection(db, "rooms", id, "items"))).forEach((d) =>
    deleteDoc(d.ref)
  );
};

export const addItem = async (id: RoomID, data: ItemData): Promise<ItemID> => {
  const d = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const r = await addDoc(collection(db, "rooms", id, "items"), d);
  return { parentID: id, id: r.id };
};

export const addItems = async (id: RoomID, dd: ItemData[]): Promise<void> => {
  for (const d of dd) await addItem(id, d);
};

export const updateItems = async (
  id: RoomID,
  titles: string[]
): Promise<void> => {
  await deleteAllItems(id);
  const dd: ItemData[] = titles.map((title, index) => ({ index, title }));
  await addItems(id, dd);
};

export const useUpdateCurrentRoomItems = (): ((
  titles: string[]
) => Promise<void>) => {
  const id = useCurrentRoomID();

  return async (titles: string[]) => {
    if (id == null) return;
    await updateItems(id, titles);
  };
};

export const useItems = (id: RoomID | undefined): Item[] | undefined => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    if (id == null) return;

    return onSnapshot(
      query(collection(db, "rooms", id, "items"), orderBy("index")),
      (s) => {
        const items: Item[] = [];

        s.forEach((d) => {
          items.push({
            id: {
              parentID: id,
              id: d.id,
            },
            data: d.data(),
          });
        });

        setItems(items);
      }
    );
  }, [id]);

  return items;
};

export const useCurrentRoomItems = (): Item[] | undefined => {
  const id = useCurrentRoomID();
  return useItems(id);
};

export const useCurrentRoomSelectedItem = (): Item | undefined => {
  const room = useCurrentRoom();
  const items = useCurrentRoomItems();
  return items?.[room?.data?.selectedIndex ?? -1];
};
