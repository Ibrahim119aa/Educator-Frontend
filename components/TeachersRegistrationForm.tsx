/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { registerTeacher } from "@/lib/API/Teacher";
import { useRouter } from 'next/navigation';

// Define the form schema with new fields: name, phone, email, password, and confirm password
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name can't exceed 50 characters"),
    phone: z.string().max(10, "Invalid phone number").regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password can't exceed 50 characters"),
    image: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB").optional(), // Validate image file
})

const TeacherRegistrationForm = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{[key: string]: string}>({});

    // Define your form with the new schema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            image: undefined, // Initialize image as undefined
        },
    });

    // Define a submit handler
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        // Handle form submission
        if (!values.image) {
            setImageError("Image is required");
            return;
        }
        setImageError(null);
        // Process the form values, including the image
        const formData = new FormData();
        formData.append("first_name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("photo", values.image);
        setLoading(true);
        const res:any = await registerTeacher(formData);
        if(res.token){
            router.push("/dashboard");
        }else{
            setError({backendError: res.error});
        }
        setLoading(false);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            form.setValue("image", file)

            // Use FileReader to generate a preview URL
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="border p-5 rounded-md">
            <h2 className="text-2xl font-semibold text-center pb-5">Register as a Teacher</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
                    <div className="flex-1 p-5 flex flex-col items-center justify-center min-w-[250px]">
                        <label className="h-40 w-40 border rounded-md cursor-pointer bg-slate-50 dark:bg-slate-900" htmlFor="image">
                            {
                                selectedImage ?
                                    <img className="h-40 w-40 object-cover rounded-md" src={selectedImage} alt="Selected Image" />
                                    :
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <span className="text-slate-500">Select Image</span>
                                        <span className="text-slate-500 text-xs">or drag and drop</span>
                                    </div>
                            }
                        </label>
                        <input type="file" className="mt-2 hidden" id="image" accept="image/*" onChange={handleImageChange} />
                        {imageError && <span className="text-sm font-medium text-destructive mt-2">{imageError}</span>}
                    </div>
                    <div className="flex-1 space-y-2 min-w-[250px]">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teacher&apos;s Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Amit Gupta" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your full name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <label className="flex items-baseline gap-2 focus-within:ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
                                        h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                                        ">
                                            <div>+91</div>
                                            <Input placeholder="9876543210" {...field} className="h-auto px-0 py-0 border-0 focus-visible:ring-0 bg-transparent ring-0"/>
                                        </label>
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid phone number including country code.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Password must be at least 8 characters long.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormDescription className="!mt-5">
                            By registring, you are accepting our <Link href="/terms-and-conditions" className="underline">terms and conditions</Link>.
                        </FormDescription>
                        <div className="!mt-5">
                            {error.backendError && <div className="text-sm font-medium text-destructive mb-2">{error.backendError}</div>}
                            <Button type="submit" className="w-full" disabled={loading}>Register</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default TeacherRegistrationForm;
