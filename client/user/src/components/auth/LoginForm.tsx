"use client";

import "react-toastify/dist/ReactToastify.css";

import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { RootState, useDispatch } from "@/Redux/store";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "../ui/button";
import { GithubIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { cn } from "@/utils";
import { setAccessToken } from "@/Redux/slices/authSlice";
import { useLogin } from "@/utils/hooks/use-login";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function LoginForm({
  className,
  ...props
}: {
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { login, response } = useLogin();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    const res = await login({ email });

    setIsLoading(false);

    // if (!response.data || response.data.message === "User not found") {
    //   toast.error("Something went wrong");
    //   return;
    // }

    const accessToken = res?.data.accessToken;

    // console.log("This is the accessToken", accessToken);
    dispatch(setAccessToken(accessToken!));
    // localStorage.setItem("accessToken", accessToken!);
    router.push(`/app`);

    toast.success("Login successful");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <h1 className="text-2xl text-center font-bold">Login</h1>
          <CardDescription className="text-center">
            Login to continue to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import * as React from "react";

// // import { cn } from "@/lib/utils";
// // import { Icons } from "@/components/icons";
// // import { Button } from "@/registry/new-york/ui/button";
// // import { Input } from "@/registry/new-york/ui/input";
// // import { Label } from "@/registry/new-york/ui/label";

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }

//   return (
//     <div className={cn("grid gap-6", className)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-2">
//           <div className="grid gap-1">
//             <Label className="sr-only" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//             />
//           </div>
//           <Button disabled={isLoading}>
//             {isLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Sign In with Email
//           </Button>
//         </div>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <Button variant="outline" type="button" disabled={isLoading}>
//         {isLoading ? (
//           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//         ) : (
//           <Icons.gitHub className="mr-2 h-4 w-4" />
//         )}{" "}
//         Github
//       </Button>
//     </div>
//   );
// }
