import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/Card";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export default function Settings({}: Props) {
  return (
    <div>
      <div>
        <Card className="max-w-[350px]">
          <CardHeader>
            <CardTitle>Tier</CardTitle>
            <CardDescription>Create or update your own Tier</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/app/tier">
              <Button>Learn more</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
