// import { useProfile, User } from "@/utils/hooks/use-profile";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, getProfile } from "@/utils/hooks/use-profile";

import ProfileForm from "@/components/profile/ProfileForm";
import { decodeStr } from "@/utils";

export default async function Page(props: any) {
  let q = props?.searchParams["q"];

  q = q && decodeStr(q);

  const user = (q && (await getProfile(q?.accessToken))) as User;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            Welcome, {user?.firstname} {user?.lastname}
          </CardTitle>
        </CardHeader>
        <CardContent>{user && <ProfileForm user={user} />}</CardContent>
      </Card>
    </>
  );
}
