"use client";

import React, { useReducer } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User } from "@/utils/hooks/use-profile";

type Props = {
  user: User;
};

const ProfileForm = ({ user }: Props) => {
  const {
    _id,
    firstname,
    lastname,
    email,
    gender,
    age,
    uid,
    dob,
    phone,
    country,
    state,
    city,
    zipCode,
  } = user;

  const [inputs, updateInputs] = useReducer(
    (prev: User, next: any) => {
      const updatedInputs = { ...prev, ...next };

      return updatedInputs;
    },
    {
      _id,
      firstname,
      lastname,
      email,
      gender,
      age,
      uid,
      dob,
      phone,
      country,
      state,
      city,
      zipCode,
    }
  );

  return (
    <>
      <form className="grid grid-cols-3 gap-2 space-y-4 w-full">
        <div>
          <Label htmlFor="_id" className="">
            ID
          </Label>
          <Input
            type="text"
            value={inputs?._id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ _id: e.target.value })
            }
            disabled
            id="_id"
            placeholder="ID"
          />
          <p className="text-xs text-muted-foreground">
            This is your id. This is auto generated and cannot be changed.
          </p>
        </div>
        <div>
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            type="text"
            id="firstname"
            value={inputs?.firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ firstname: e.target.value })
            }
            placeholder="Firstname"
          />
        </div>
        <div>
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            type="text"
            id="lastname"
            value={inputs?.lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ lastname: e.target.value })
            }
            placeholder="Lastname"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={inputs?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ email: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Input
            type="text"
            id="gender"
            value={inputs?.gender}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ gender: e.target.value })
            }
            placeholder="Gender"
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            type="text"
            id="age"
            placeholder="Age"
            value={inputs?.age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ age: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="uid">UID</Label>
          <Input
            type="text"
            id="uid"
            placeholder="UID"
            value={inputs?.uid}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ uid: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            type="date"
            id="dob"
            value={inputs?.dob}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ dob: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="text"
            id="phone"
            placeholder="Phone"
            value={inputs?.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ phone: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            placeholder="Country"
            value={inputs?.country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ country: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            placeholder="State"
            value={inputs?.state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ state: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            placeholder="City"
            value={inputs?.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ city: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            type="text"
            id="zipCode"
            placeholder="Zip Code"
            value={inputs?.zipCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateInputs({ zipCode: e.target.value })
            }
          />
        </div>
      </form>
      <div className="flex w-full items-center justify-end">
        <Button>Update</Button>
      </div>
    </>
  );
};

export default ProfileForm;
