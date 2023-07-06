"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const Error = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>Error</CardHeader>
      <CardContent>
        <p>{error?.message}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive">Reset</Button>
      </CardFooter>
    </Card>
  );
};
