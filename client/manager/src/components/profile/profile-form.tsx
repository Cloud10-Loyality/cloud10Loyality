import React, { FormEvent, useReducer, useTransition } from "react";
import { RootState, useSelector } from "@/redux/store";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/Label";
import { ManagerType } from "../../../types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {};

const ProfileForm = (props?: Props) => {
  const { manager, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [inputs, updateInputs] = useReducer(
    (prev: ManagerType, next: any) => {
      const updatedInputs = { ...prev, ...next };

      return updatedInputs;
    },
    {
      _id: manager?._id,
      name: manager?.name,
      username: manager?.username,
      email: manager?.email,
      city: manager?.city,
      state: manager?.state,
      pin: manager?.pin,
      description: manager?.description,
      isLoading: false,
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    updateInputs({ isLoading: true });

    try {
      const res = await axios.patch(
        `http://cloud10lms.com/api/v1/manager/${manager?._id}`,
        {
          name: inputs?.name,
          username: inputs?.username,
          email: inputs?.email,
          city: inputs?.city,
          state: inputs?.state,
          pin: inputs?.pin,
          description: inputs?.description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success(res?.data?.message);
      startTransition(() => {
        router.refresh();
        updateInputs({ isLoading: false });
      });
    } catch (err) {
      console.log(err);
      updateInputs({ isLoading: false });
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-sm text-muted-foreground">This is your profile</p>
      <Separator className="my-8" />
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="space-y-2 mb-8">
          <Label htmlFor="_id" className="">
            ID
          </Label>
          <Input
            type="text"
            value={inputs?._id}
            onChange={(e) => updateInputs({ _id: e.target.value })}
            disabled
            id="_id"
            placeholder="ID"
          />
          <p className="text-xs text-muted-foreground">
            This is your id. This is auto generated and cannot be changed.
          </p>
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={inputs?.name}
            onChange={(e) => updateInputs({ name: e.target.value })}
            placeholder="Name"
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={inputs?.username}
            onChange={(e) => updateInputs({ username: e.target.value })}
            placeholder="Username"
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={inputs?.email}
            onChange={(e) => updateInputs({ email: e.target.value })}
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            value={inputs?.city}
            onChange={(e) => updateInputs({ city: e.target.value })}
            placeholder="City"
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            placeholder="State"
            value={inputs?.state}
            onChange={(e) => updateInputs({ state: e.target.value })}
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="pin">Pin</Label>
          <Input
            type="text"
            id="pin"
            placeholder="Pin"
            value={inputs?.pin}
            onChange={(e) => updateInputs({ pin: e.target.value })}
          />
        </div>
        <div className="space-y-2 mb-8">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="discription"
            placeholder="Description"
            value={inputs?.description}
            onChange={(e) => updateInputs({ description: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" className="ml-auto">
            {inputs?.isLoading && (
              <ReloadIcon className="h-4 w-4 mr-2 animate-spin" />
            )}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
