import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState,useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const Auth = () => {

    const [signUpInput, setSignUpInput] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const [signInInput, setSignInInput] = useState({
        email: "",
        password: "",
      });

      
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setSignInInput({ ...signInInput, [name]: value });
    }
  };

  const buttonHandler = async (type) => {
    const inputData = type === "signUp" ? signUpInput : signInInput;
    const action = type ==="signUp" ? registerUser : loginUser;
    await action(inputData);
    setSignInInput({
      email: "",
      password: "",
    });
    setSignUpInput({
      name: "",
      email: "",
      password: "",
    });
  };

      const isRegisterLoading = false;
      const isLoginLoading = false;

  return (
    <div className="flex items-center justify-center mt-28">
      <Tabs defaultValue="signIn" className="w-[420px]">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="signUp" >SignUp</TabsTrigger>
          <TabsTrigger value="signIn">SignIn</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Enter your details to create a new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={signUpInput.name}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  placeholder="Enter Your Name"
                  name="name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  value={signUpInput.email}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  id="email"
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="........"
                  value={signUpInput.password}
                  onChange={(e) => changeInputHandler(e, "signUp")}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled = {isRegisterLoading}
                onClick={() => buttonHandler("signUp")}>
                  {
                    isRegisterLoading? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin "/> Please Wait...
                      </>
                    ) : "Register"
                  }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signIn">
          <Card>
            <CardHeader>
              <CardTitle>Sign-In</CardTitle>
              <CardDescription>
                Bro, Kindly sign-in to track the courses where you had left...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.email}
                  placeholder="abc@xyz.pqr"
                  name="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => changeInputHandler(e, "signIn")}
                  value={signInInput.password}
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled = {isLoginLoading}
                onClick={() => buttonHandler("signIn")}>
                  {
                    isLoginLoading? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin "/> Logging...
                      </>
                    ) : "Login"
                  }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
