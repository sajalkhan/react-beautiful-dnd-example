import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "react-query";
import { fetchPosts, deletePost } from "./Api";

import {
  DndItemsValue,
  DndListContainer,
} from "../src/components/dnd-list-container";
import { Button } from "./components/button";
import { ButtonContainer } from "./components/button-container";
import { FixedControl } from "./components/fixed-control";
import { Loading } from "./components/loading";
import "./index.scss";

const Customize: React.FC = () => {
  const [lists, setLists] = useState<DndItemsValue[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);

  //*------ react query -----------//
  const { data, isError, isLoading } = useQuery("posts", fetchPosts);
  const deleteMutation = useMutation((postId: number) => deletePost(postId));
  //*------ react query -----------//

  const handleGetData = useCallback((): DndItemsValue[] => {
    const posts: DndItemsValue[] = [];
    data?.map((item: DndItemsValue) =>
      posts.push({ id: String(item.id), title: item.title })
    );
    return posts;
  }, [data]);

  useEffect(() => {
    setLists(handleGetData);
  }, [handleGetData]);

  const handleEnd = (value: DndItemsValue[]) => {};

  const handleUpdate = () => {
    setIsVisible(true);
  };

  const handleRemoveItem = (id: number) => {
    setIsVisible(true);
    setDeleteItemId(id);
  };

  const handleCancel = useCallback(() => {
    setIsVisible(false);
    setLists(handleGetData);
  }, [handleGetData]);

  const handleSubmit = () => {
    deleteMutation.mutate(deleteItemId);
    setIsVisible(false);
    setDeleteItemId(0);
  };

  if (isLoading) return <Loading />;
  if (isError) return <h3>Opps, Something went wrong!</h3>;

  return (
    <div>
      <DndListContainer
        lists={lists}
        onEnd={handleEnd}
        onUpdate={handleUpdate}
        removeItem={handleRemoveItem}
      />

      <FixedControl modifiers="btn-container" isVisible={isVisible}>
        <ButtonContainer>
          <Button
            type="button"
            size="huge"
            modifiers="third"
            onClick={handleCancel}
          >
            cancle
          </Button>
          <Button
            type="button"
            size="huge"
            modifiers="primary"
            onClick={handleSubmit}
          >
            submit
          </Button>
        </ButtonContainer>
      </FixedControl>
    </div>
  );
};

export default Customize;
