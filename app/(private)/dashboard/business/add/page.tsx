"use client"

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  revenueSource: z.enum(['stripe', 'lemon', 'creem']),
  apiKey: z.string().optional(),
})

export default function AddStartupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      websiteUrl: "",
      twitterUrl: "",
      githubUrl: "",
      revenueSource: "stripe",
      apiKey: "",
    },
  })
  const router = useRouter()

  const revenueSource = form.watch('revenueSource')

  useEffect(() => {
    form.setValue('apiKey', '')
  }, [revenueSource, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submitData = {
      ...values,
      stripeKey: values.revenueSource === 'stripe' ? values.apiKey : undefined,
      lemonKey: values.revenueSource === 'lemon' ? values.apiKey : undefined,
      creemKey: values.revenueSource === 'creem' ? values.apiKey : undefined,
    }

    toast.promise(
      fetch('/api/startups/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to add startup');
        }
        return response.json();
      }),
      {
        loading: 'Adding startup...',
        success: () => {
          form.reset();
          router.push('/dashboard/business');
          return "Startup added successfully";
        },
        error: 'Failed to add startup',
      }
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <h2 className="font-bold mb-4 text-xs">Add Startup</h2>
      <Separator className="mb-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Image URL</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Website URL</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Twitter URL</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">GitHub URL</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="revenueSource"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">Revenue Source</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2 w-full"
                  >
                    {['stripe', 'lemon'].map((source) => (
                      <Card key={source} className="flex-1 flex items-center justify-center p-4 cursor-pointer hover:bg-gray-800 rounded-md">
                        <RadioGroupItem value={source} id={source} className="mr-2" />
                        <Label htmlFor={source} className="capitalize">{source}</Label>
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground font-semibold">API Key</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 text-white" placeholder={`Enter ${revenueSource} API key`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="sm" type="submit" className="w-full font-bold bg-gray-800/90 hover:bg-gray-700 text-white">Add Startup</Button>
        </form>
      </Form>
    </Card>
  )
}
