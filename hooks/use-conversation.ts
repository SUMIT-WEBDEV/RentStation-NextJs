"use client";

import { useState, useEffect } from "react";
import { createConversationId } from "@/actions/create-conversationId";

interface IChatProps {
  conversationId?: string;
  sellerId?: string;
  sellerName?: string;
  user?: any;
}

export const useConversation = ({
  conversationId,
  sellerId,
  sellerName,
  user,
}: IChatProps) => {
  const [dynamicConversationId, setDynamicConversationId] =
    useState<any>(conversationId);
  const [dynamicSellerId, setDynamicSellerId] = useState<any>(sellerId);
  const [dynamicSellerName, setDynamicSellerName] = useState<any>(sellerName);
  const [userLoading, setUserLoading] = useState(false);
  const [searchChatText, setSearchChatText] = useState<string>("");

  if (user === undefined) {
    setUserLoading(true);
  }

  // useEffect(() => {
  //   // Add overflow hidden to body on mount
  //   document.body.style.overflowY = "hidden";

  //   // Remove overflow hidden from body on unmount
  //   return () => {
  //     document.body.style.overflowY = "unset";
  //   };
  // }, []);

  const handleInboxChat = (selectedUser: any) => {
    if (user) {
      createConversationId(user?.id, selectedUser.id)
        .then((data) => {
          // console.log("data is conversationId-----", data);
          setDynamicConversationId(data.conversationId);
          setDynamicSellerName(selectedUser.name);
          setDynamicSellerId(selectedUser.id);

          window.history.pushState(
            {},
            "",
            `/chat/new/${data.conversationId}/${selectedUser.id}`
          );
        })
        .catch((err) => console.error(err));
    }
  };

  return {
    dynamicConversationId,
    dynamicSellerId,
    dynamicSellerName,
    userLoading,
    searchChatText,
    setSearchChatText,
    handleInboxChat,
  };
};
