'use client'

import { SettingsIcon } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

export default function Component(): JSX.Element {
  const [, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col">
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
            >
              <SettingsIcon className="size-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Simulations</SheetTitle>
              {/* <SheetClose /> */}
              <SheetDescription>
                Configure the simulation and messages.
              </SheetDescription>
            </SheetHeader>
            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Simulation
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Configuration</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <RabbitIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{' '}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p
                                className="text-xs"
                                data-description
                              >
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <BirdIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{' '}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p
                                className="text-xs"
                                data-description
                              >
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <TurtleIcon className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{' '}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p
                                className="text-xs"
                                data-description
                              >
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="0.4"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="top-p">Top P</Label>
                      <Input
                        id="top-p"
                        type="number"
                        placeholder="0.7"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="top-k">Top K</Label>
                      <Input
                        id="top-k"
                        type="number"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="You are a..."
                      className="min-h-[9.5rem]"
                    />
                  </div>
                </fieldset>
              </form>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Simulation
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="model">Configuration</Label>
                <Select>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genesis">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <RabbitIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{' '}
                            <span className="font-medium text-foreground">
                              Genesis
                            </span>
                          </p>
                          <p
                            className="text-xs"
                            data-description
                          >
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="explorer">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <BirdIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{' '}
                            <span className="font-medium text-foreground">
                              Explorer
                            </span>
                          </p>
                          <p
                            className="text-xs"
                            data-description
                          >
                            Performance and speed for efficiency.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="quantum">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <TurtleIcon className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{' '}
                            <span className="font-medium text-foreground">
                              Quantum
                            </span>
                          </p>
                          <p
                            className="text-xs"
                            data-description
                          >
                            The most powerful model for complex computations.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="0.4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input
                    id="top-p"
                    type="number"
                    placeholder="0.7"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input
                    id="top-k"
                    type="number"
                    placeholder="0.0"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="You are a..."
                  className="min-h-[9.5rem]"
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge
            variant="outline"
            className="absolute right-3 top-3"
          >
            Output
          </Badge>
          <div className="flex-1" />
          <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Label
              htmlFor="message"
              className="sr-only"
            >
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <PaperclipIcon className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MicIcon className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  Send Message
                  <CornerDownLeftIcon className="size-3.5" />
                </Button>
              </TooltipProvider>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

function BirdIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  )
}

function RabbitIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 16a3 3 0 0 1 2.24 5" />
      <path d="M18 12h.01" />
      <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
      <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
      <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
    </svg>
  )
}

function TurtleIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
      <path d="M4.82 7.9 8 10" />
      <path d="M15.18 7.9 12 10" />
      <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
    </svg>
  )
}

function PaperclipIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function MicIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line
        x1="12"
        x2="12"
        y1="19"
        y2="22"
      />
    </svg>
  )
}

function CornerDownLeftIcon(props: any): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  )
}
