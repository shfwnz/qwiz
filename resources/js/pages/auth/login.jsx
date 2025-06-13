import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import ParticleBackground from '@/components/particle-background';

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ParticleBackground />
            <Card className="justify-center flex flex-col items-center w-full max-w-md space-y-2 p-12">
                <CardHeader className="flex justify-center">
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent className="gap-2 flex flex-col w-full">
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                </CardContent>
                <CardFooter className="w-full flex flex-col gap-3">
                    <Button className="w-full">Login</Button>
                    <div className="w-full">
                        <a href="/register">Dont have an account?</a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
