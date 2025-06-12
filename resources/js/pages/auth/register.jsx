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

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full bg-transparent">
            <Card className="justify-center flex flex-col items-center w-full max-w-md space-y-2 px-8 py-12">
                <CardHeader className="flex w-full justify-center">
                    <CardTitle className="text-2xl">Register</CardTitle>
                </CardHeader>
                <CardContent className="gap-2 flex flex-col w-full">
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                </CardContent>
                <CardFooter className="w-full">
                    <Button className="w-full">Register</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
