"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Gender, User } from "@/libs/hooks/use-user";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";

type Props = {
  user: User;
};

export default function UserDetails({ user }: Props) {
  const [firstname, setFirstname] = React.useState(user.firstname);
  const [lastname, setLastname] = React.useState(user.lastname);
  const [email, setEmail] = React.useState(user.email);
  const [gender, setGender] = React.useState(user.gender);
  const [age, setAge] = React.useState(user.age);
  const [phone, setPhone] = React.useState(user.phone);
  const [country, setCountry] = React.useState(user.country);
  const [city, setCity] = React.useState(user.city);
  const [state, setState] = React.useState(user.state);
  const [dob, setDob] = React.useState(user.dob as Date);
  const [uid, setUid] = React.useState(user.uid);
  const [zipCode, setZipCode] = React.useState(user.zipCode);

  const [editEnabled, setEditEnabled] = React.useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-4 gap-2">
            <div>
              <Label htmlFor="_id">ID</Label>
              <Input type="text" name="id" id="_id" value={user._id} disabled />
            </div>
            <div>
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input
                type="text"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as User["gender"])}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                type="text"
                name="age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="uid">UID</Label>
              <Input
                type="text"
                name="uid"
                id="uid"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                type="date"
                name="dob"
                id="dob"
                value={dob as unknown as string}
                onChange={(e) => setDob(e.target.valueAsDate)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.valueAsNumber)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                name="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!editEnabled}
              />
            </div>
            <div>
              <Label htmlFor="zipcode">Zip Code</Label>
              <Input
                type="text"
                name="zipcode"
                id="zipcode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.valueAsNumber)}
                disabled={!editEnabled}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="ghost" disabled={editEnabled}>
            Edit
          </Button>
          {/* TODO: Remove disabled */}
          <Button variant="default" disabled>
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
