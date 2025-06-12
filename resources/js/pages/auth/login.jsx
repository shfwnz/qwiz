import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
            <Card className="justify-center flex flex-col items-center w-full max-w-md space-y-2 px-8 py-12">
                <CardHeader className="flex w-full justify-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="gap-2 flex flex-col w-full">
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                </CardContent>
                <CardFooter className="w-full">
                    <Button className="w-full">Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
