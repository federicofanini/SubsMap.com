"use client"

import React, { useState } from 'react'
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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StartupSubTable from './StartupSubTable'

const formSchema = z.object({
  brand: z.string().min(1, { message: "Please select a brand" }),
  customBrand: z.string().optional(),
  day: z.number().int().min(1).max(31, { message: "Please enter a valid day (1-31)" }),
  month: z.number().int().min(1).max(12).optional(),
  amount: z.number().positive({ message: "Please enter a valid amount" }),
  currency: z.enum(["USD", "EUR"]),
  billingCycle: z.enum(["monthly", "annual"]),
  note: z.string().optional(),
})

interface StartupSubFormProps {
  onNewSubscription: () => void;
  startupId: string;
}

export function StartupSub({ onNewSubscription, startupId }: StartupSubFormProps) {
  const [newSubscriptionAdded, setNewSubscriptionAdded] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      customBrand: "",
      day: 1,
      amount: 0,
      currency: "USD",
      billingCycle: "monthly",
      note: "",
    },
  })
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
      ...values,
      brand: values.brand === 'custom' ? values.customBrand : values.brand,
      startupId,
    };
    toast.promise(
      fetch('/api/startups/subscriptions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Failed to add startup subscription');
        }
        return response.json();
      }),
      {
        loading: 'Adding startup subscription...',
        success: () => {
          form.reset();
          onNewSubscription();
          setNewSubscriptionAdded(prev => !prev); // Toggle to trigger re-render
          router.refresh();
          return "Startup subscription added successfully";
        },
        error: 'Failed to add startup subscription',
      }
    );
  }

  return (
    <>
      <Card className="max-w-lg mx-auto bg-black text-white p-4 rounded-lg border-none mt-2">
        <h2 className="font-bold mb-4 text-xs">Add Startup Subscription</h2>
        <Separator className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      {Object.entries(BrandIcons).map(([name, { icon: Icon, color }]) => (
                        <SelectItem key={name} value={name.toLowerCase()}>
                          <div className="flex items-center">
                            <Icon className={`mr-2 text-${color}`} />
                            {name}
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('brand') === 'custom' && (
              <FormField
                control={form.control}
                name="customBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground font-semibold">Custom Brand Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-800 text-white" placeholder="Enter custom brand name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground font-semibold">Day</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="31" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-gray-800 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground font-semibold">Month (optional)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="12" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-gray-800 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground font-semibold">Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="bg-gray-800 text-white" />
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
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="billingCycle"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Billing Cycle</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="monthly" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Monthly
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="annual" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Annual
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-semibold">Note</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-800 text-white" placeholder="Optional note" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="sm" type="submit" className="w-full font-bold bg-gray-800/90 hover:bg-gray-700 text-white">Add Startup Subscription</Button>
          </form>
        </Form>
      </Card>
      <StartupSubTable 
        startupId={startupId} 
        onDelete={() => {}} 
        newSubscriptionAdded={newSubscriptionAdded} 
      />
    </>
  )
}
