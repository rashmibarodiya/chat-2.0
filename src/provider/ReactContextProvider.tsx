'use client'

import { RecoilRoot } from "recoil";

export default function ReactContextProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <RecoilRoot>{children}</RecoilRoot>;
  }