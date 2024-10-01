"use client"

import React from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from '../ui/separator'
import { BrandIcons } from '@/components/sub/BrandIcons'

const formSchema = z.object({
  brand: z.string().min(1, { message: "Please select a brand" }),
  day: z.string().regex(/^([1-9]|[12]\d|3[01])$/, {
    message: "Please enter a valid day (1-31)",
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid amount",
  }),
  currency: z.enum(["EUR", "USD"]),
})

export function InsertSubForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      day: "",
      amount: "",
      currency: "EUR",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
      <h2 className="font-bold mb-4 text-xs">Add Sub</h2>
      <Separator className="mb-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Brand</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(BrandIcons).map(([name, Icon]) => (
                        <SelectItem key={name} value={name.toLowerCase()}>
                          <div className="flex items-center">
                            <Icon className="mr-2" />
                            {name}
                          </div>
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
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Day</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="31" {...field} className="bg-gray-800 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} className="bg-gray-800 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button size="sm" type="submit" className="w-full font-bold bg-gray-800/90 hover:bg-gray-700 text-white">Add Subscription</Button>
        </form>
      </Form>
    </Card>
  )
}
