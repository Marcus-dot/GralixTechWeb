import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { products } from "@/constants/products";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid work email."),
    company: z.string().min(2, "Company name is required."),
    product: z.string().min(1, "Please select a product."),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DemoRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultProduct?: string;
}

export const DemoRequestModal = ({
    isOpen,
    onClose,
    defaultProduct,
}: DemoRequestModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            product: defaultProduct || "",
            message: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Demo request submitted:", values);
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Demo request submitted successfully!");

        setTimeout(() => {
            setIsSuccess(false);
            form.reset();
            onClose();
        }, 3000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-background border-border shadow-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                        Request a Product Demo
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill out the form below and our team will get back to you to schedule a personalized demonstration.
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">Request Received!</h3>
                            <p className="text-muted-foreground">
                                Thank you for your interest. One of our specialists will contact you shortly.
                            </p>
                        </motion.div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} className="bg-muted/50 border-border focus:border-accent" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Work Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@company.com" {...field} className="bg-muted/50 border-border focus:border-accent" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Company Ltd" {...field} className="bg-muted/50 border-border focus:border-accent" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="product"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product of Interest</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-muted/50 border-border focus:border-accent">
                                                        <SelectValue placeholder="Select a product" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-popover border-border">
                                                    {products.map((p) => (
                                                        <SelectItem key={p.id} value={p.id}>
                                                            {p.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Requirements (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us about your specific needs..."
                                                    className="bg-muted/50 border-border focus:border-accent resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full gradient-orange text-accent-foreground font-bold h-12 rounded-lg"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        ) : (
                                            "Schedule My Demo"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};
