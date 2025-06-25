/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/Dashboard/Teacher/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addNewTeachingLocation,
  addTeacherResidentialAddress,
  addTeacherSubject,
  changeTeacherProfilePic,
  checkForAccountVerification,
  deleteTeacherSubject,
  deleteTeachingLocation,
  getClassList,
  getSubjectList,
  getTeachingLocationList,
  getTeachingLocationWardsList,
  initiatePaymentForTeacherVerification,
  teacherProfile,
  updateTeacherPermanentAddress,
  updateTeacherProfile,
  updateTeacherResidentialAddress,
  uploadDocument,
  verifyTeacherPayment,
} from "@/lib/API/Teacher";
import { cn, createSVGDataUrl, statesOfIndia } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  EllipsisVertical,
  Loader,
  Pencil,
  Plus,
  Trash,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { TeacherData, TeachingLocation, Ward } from "@/types/teacher";
import { ResidentialAddressFormProps } from "@/types/teacher";
export const DataValidationContext = createContext<{
  validate: boolean;
  setValidate: React.Dispatch<React.SetStateAction<boolean>>;
  validateProfile: boolean;
  setValidateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  validate: false,
  setValidate: () => {},
  validateProfile: false,
  setValidateProfile: () => {},
});

const formatDate = (dateString: string) => {
  if (!dateString) return undefined; // Return undefined for empty or invalid dates
  const [year, month, day] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

function formatDateToYMD(date: Date) {
  // Get the year, month, and day
  const year = date.getFullYear();
  // Month is zero-indexed, so add 1 and pad to two digits
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // Pad day to two digits
  const day = String(date.getDate()).padStart(2, "0");

  // Combine into yyyy-MM-dd format
  return `${year}-${month}-${day}`;
}

export const TeacherUpdateForm = ({ teacherData }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const { validate:_validate, setValidate } = useContext(DataValidationContext);

  const formSchema = z.object({
    teacher_id: z.any(),
    first_name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name can't exceed 50 characters"),
    middle_name: z.string(),
    last_name: z.string(),
    fathers_name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name can't exceed 50 characters"),
    mothers_name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name can't exceed 50 characters"),
    phone: z
      .string()
      .max(10, "Invalid phone number")
      .min(10, "Invalid phone number")
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    dob: z.date().max(new Date(), "Date of birth must be in the past"),
    gender: z
      .enum(["Male", "Female", "Other"])
      .refine(
        (val) => ["Male", "Female", "Other"].includes(val),
        "Invalid gender"
      ),
    education_qualification: z
      .string()
      .min(2, "Qualification must be at least 2 characters long")
      .max(100, "Qualification can't exceed 100 characters"),
    teaching_experience_years: z
      .number()
      .int()
      .nonnegative("Experience must be a non-negative number"),
    aadhar_number: z
      .string()
      .length(12, "Aadhar number must be exactly 12 digits")
      .regex(/^\d{12}$/, "Invalid Aadhar number"),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      values.dob = formatDateToYMD(values.dob) as unknown as Date;
      // if(values.phone && values.phone.length === 10){
      //     values.phone = `+91${values.phone}`;
      // }

      const res = (await updateTeacherProfile(values)) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        setLoading(false);
        return;
      } else {
        setError({});
        toast(res?.message, {
          // description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setValidate(true);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacher_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      fathers_name: "",
      mothers_name: "",
      phone: "",
      email: "",
      dob: undefined,
      gender: "Male",
      education_qualification: "",
      teaching_experience_years: 0,
      aadhar_number: "",
    },
  });

  const { reset } = form;

  const setDataToForm = useCallback(() => {
    reset({
      teacher_id: teacherData.teacher_id || "",
      first_name: teacherData.first_name || "",
      middle_name: teacherData.middle_name || "",
      last_name: teacherData.last_name || "",
      fathers_name: teacherData.fathers_name || "",
      mothers_name: teacherData.mothers_name || "",
      phone: teacherData.phone || "",
      email: teacherData.email || "",
      dob: formatDate(teacherData.dob) || undefined,
      gender: teacherData.gender || "Male",
      education_qualification: teacherData.education_qualification || "",
      teaching_experience_years:
        Number(teacherData.teaching_experience_years) || 0,
      aadhar_number: teacherData.aadhar_number || "",
    });
  }, [teacherData, reset]);

  useEffect(() => {
    setDataToForm();
  }, [teacherData, setDataToForm]);

  return (
    <Card className="p-5">
      <CardHeader className="px-0">
        <CardTitle>Teacher Information</CardTitle>
        <CardDescription>
          Update your personal information here.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
          <div className="flex-1 space-y-5 w-full">
            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Middle Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="fathers_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Father's Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mothers_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Mother's Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Whatsapp Number)</FormLabel>
                    <FormControl>
                      <label
                        className="flex items-baseline gap-2 focus-within:ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
                                        h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                                        "
                      >
                        <div>+91</div>
                        <Input
                          placeholder="9876543210"
                          {...field}
                          className="h-auto px-0 py-0 border-0 focus-visible:ring-0 bg-transparent ring-0"
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap gap-2 item [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? new Date(
                                field.value.getTime() -
                                  field.value.getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substring(0, 10)
                            : ""
                        }
                        onChange={(e:any) => {
                          field.onChange(
                            e.target.value ? new Date(e.target.value) : ""
                          );
                        }}
                        className="block"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="education_qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Qualification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Education Qualification"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teaching_experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching Experience (in Years)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Teaching Experience"
                        {...field}
                        onChange={(e:any) => {
                          const value = e.target.value;
                          // Only keep numeric values and restrict to a maximum of 2 characters
                          const numericValue = value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 2);
                          field.onChange(Number(numericValue));
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="aadhar_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Aadhar Number (For Verification Purpose only)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="!mt-5">
              {error.backendError && (
                <div className="text-sm font-medium text-destructive mb-2">
                  {error.backendError}
                </div>
              )}
              <div className="flex justify-end">
                <Button type="submit" className="" disabled={loading}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

////////////////////////////////////////////////////////////



const residentialAddressFormSchema = z.object({
  address_id: z.number().optional(),
  ward_no_panchayat: z.string(),
  colony_village: z.string(),
  landmark: z.string(),
  city: z.string().min(2, "City Name must be at least 2 characters long"),
  pin_code: z
    .string()
    .min(6, "Pincode must be 6 characters long")
    .max(6, "Pincode must be 6 characters long"),
  state: z.string().min(2, "Please provide correct state name"),
});



export const ResidentialAddressForm = memo(
  ({ teacherData, canUpdate = true }: ResidentialAddressFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});

    const stateOptions = statesOfIndia.map((state) => ({
      value: state,
      label: state,
    }));
    const [value, setValue] = useState("");

    const { setValidate } = useContext(DataValidationContext);

    const onSubmit = async (
      values: z.infer<typeof residentialAddressFormSchema>
    ) => {
      try {
        setLoading(true);

        const res = values.address_id
          ? ((await updateTeacherResidentialAddress(values)) as any)
          : ((await addTeacherResidentialAddress(values)) as any);
        if (res.error) {
          setError({ backendError: res.error });
          console.error("Error", res.error);
          setLoading(false);
          return;
        } else {
          setError({});
          toast(res?.message, {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setValidate(true);
      }
    };

    const form = useForm<z.infer<typeof residentialAddressFormSchema>>({
      resolver: zodResolver(residentialAddressFormSchema),
      defaultValues: {
        address_id: undefined,
        ward_no_panchayat: "",
        colony_village: "",
        landmark: "",
        city: "",
        pin_code: "",
        state: "",
      },
    });

    const { reset } = form;

    const setDataToForm = useCallback(() => {
      reset({
        address_id:
          Number(teacherData.residential_address?.address_id) || undefined,
        ward_no_panchayat:
          teacherData.residential_address?.ward_no_panchayat || "",
        colony_village: teacherData.residential_address?.colony_village || "",
        landmark: teacherData.residential_address?.landmark || "",
        city: teacherData.residential_address?.city || "",
        pin_code: teacherData.residential_address?.pin_code || "",
        state: teacherData.residential_address?.state || "",
      });
    }, [teacherData, reset]);

    useEffect(() => {
      setDataToForm();
      setValue(teacherData?.residential_address?.state || "");
    }, [teacherData, setDataToForm]);

    return (
      <Card className="p-5">
        <CardHeader className="px-0">
          <CardTitle>Residential Address</CardTitle>
          <CardDescription>Update your current address here.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap"
          >
            <div className="flex-1 space-y-5 w-full">
              <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
                <FormField
                  control={form.control}
                  name="ward_no_panchayat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward No / Panchayat</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ward No / Panchayat"
                          {...field}
                          readOnly={!canUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colony_village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colony / Village</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Colony / Village"
                          {...field}
                          readOnly={!canUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Landmark"
                          {...field}
                          readOnly={!canUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                          readOnly={!canUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pin_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pin Code"
                          {...field}
                          onChange={(e:any) => {
                            const cleaned = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);
                            field.onChange(cleaned);
                          }}
                          value={field.value}
                          readOnly={!canUpdate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Popover>
                    <FormLabel>State</FormLabel>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-between text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-background hover:text-inherit dark:hover:bg-background dark:hover:text-inherit"
                        role="state"
                      >
                        {value ? (
                          stateOptions.find((option) => option.value === value)
                            ?.label
                        ) : (
                          <span className="text-muted-foreground">
                            Select State
                          </span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search State" />
                        <CommandList>
                          <CommandEmpty>No State Found</CommandEmpty>
                          <CommandGroup>
                            {stateOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue);
                                  form.setValue("state", currentValue);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === option.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="!mt-5">
                {error.backendError && (
                  <div className="text-sm font-medium text-destructive mb-2">
                    {error.backendError}
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className=""
                    disabled={loading || !canUpdate}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    );
  }
);

ResidentialAddressForm.displayName = "ResidentialAddressForm";

interface PermanentAddressFormProps {
  teacherData: {
    permanent_ward_no_panchayat?: string;
    permanent_colony_village?: string;
    permanent_landmark?: string;
    permanent_city?: string;
    permanent_pin_code?: string;
    permanent_state?: string;
  };
  canUpdate?: boolean;
}

const PermanentAddressFormSchema = z.object({
  ward_no_panchayat: z.string(),
  colony_village: z.string(),
  landmark: z.string(),
  city: z.string().min(2, "City Name must be at least 2 characters long"),
  pin_code: z
    .string()
    .min(6, "Pincode must be 6 characters long")
    .max(6, "Pincode must be 6 characters long"),
  state: z.string().min(2, "Please provide correct state name"),
});

export const PermanentAddressForm = memo(
  ({ teacherData, canUpdate = true }: PermanentAddressFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});

    const stateOptions = statesOfIndia.map((state) => ({
      value: state,
      label: state,
    }));
    const [value, setValue] = useState("");

    const { setValidate } = useContext(DataValidationContext);

    const onSubmit = async (
      values: z.infer<typeof PermanentAddressFormSchema>
    ) => {
      try {
        setLoading(true);

        const res = (await updateTeacherPermanentAddress(values)) as any;
        if (res.error) {
          setError({ backendError: res.error });
          console.error("Error", res.error);
          setLoading(false);
          return;
        } else {
          setError({});
          toast(res?.message, {
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setValidate(true);
      }
    };

    const form = useForm<z.infer<typeof PermanentAddressFormSchema>>({
      resolver: zodResolver(PermanentAddressFormSchema),
      defaultValues: {
        ward_no_panchayat: "",
        colony_village: "",
        landmark: "",
        city: "",
        pin_code: "",
        state: "",
      },
    });

    const { reset } = form;

    const setDataToForm = useCallback(() => {
      reset({
        ward_no_panchayat: teacherData.permanent_ward_no_panchayat || "",
        colony_village: teacherData.permanent_colony_village || "",
        landmark: teacherData.permanent_landmark || "",
        city: teacherData.permanent_city || "",
        pin_code: teacherData.permanent_pin_code || "",
        state: teacherData.permanent_state || "",
      });
    }, [teacherData, reset]);

    useEffect(() => {
      setDataToForm();
      setValue(teacherData?.permanent_state || "");
    }, [teacherData, setDataToForm]);

    return (
      <Card className="p-5">
        <CardHeader className="px-0">
          <CardTitle>Permanent Address</CardTitle>
          <CardDescription>Update your permanent address here.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap"
          >
            <div className="flex-1 space-y-5 w-full">
              <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
                <FormField
                  control={form.control}
                  name="ward_no_panchayat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ward No / Panchayat</FormLabel>
                      <FormControl>
                        <Input placeholder="Ward No / Panchayat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colony_village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colony / Village</FormLabel>
                      <FormControl>
                        <Input placeholder="Colony / Village" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark</FormLabel>
                      <FormControl>
                        <Input placeholder="Landmark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pin_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pin Code"
                          {...field}
                          onChange={(e:any) => {
                            const value = e.target.value;
                            // Only keep numeric values
                            const numericValue = value.replace(/\D/g, "");
                            field.onChange(numericValue);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field:_field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className="w-full justify-between text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-background hover:text-inherit dark:hover:bg-background dark:hover:text-inherit"
                              role="state"
                            >
                              {value ? (
                                stateOptions.find(
                                  (option) => option.value === value
                                )?.label
                              ) : (
                                <span className="text-muted-foreground">
                                  Select State
                                </span>
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search State" />
                              <CommandList>
                                <CommandEmpty>No State Found</CommandEmpty>
                                <CommandGroup>
                                  {stateOptions.map((option) => (
                                    <CommandItem
                                      key={option.value}
                                      value={option.value}
                                      onSelect={(currentValue) => {
                                        setValue(currentValue);
                                        form.setValue("state", currentValue);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          value === option.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {option.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="!mt-5">
                {error.backendError && (
                  <div className="text-sm font-medium text-destructive mb-2">
                    {error.backendError}
                  </div>
                )}
                <div className="flex justify-end">
                  {canUpdate && (
                    <Button type="submit" className="" disabled={loading}>
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    );
  }
);

PermanentAddressForm.displayName = "PermanentAddressForm";

//////////////////////////////////////////////////////////// Teaching Location Preferences ////////////////////////////////////////////////////////////

const formSchema = z.object({
  ward_no_panchayat: z.string().min(1, "Ward No / Panchayat is required"),
  teaching_location: z.string().min(1, "Teaching Location is required"),
});

export const TeachingLocationPreference = ({
  teacherData,
  setTeacherData,
  canUpdate = true,
}: {
  teacherData: TeacherData;
  setTeacherData: (data: TeacherData) => void;
  canUpdate?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const [teachingLocationList, setTeachingLocationList] = useState<
    TeachingLocation[]
  >([]);
  const [teachingLocationWardsList, setTeachingLocationWardsList] = useState<
    Ward[]
  >([]);
  const [loadingWards, setLoadingWards] = useState(false);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number>();

  const { setValidateProfile } = useContext(DataValidationContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ward_no_panchayat: "",
      teaching_location: "",
    },
  });

  const getTeachingLocations = async () => {
    try {
      const res = await getTeachingLocationList();
      if ("error" in res) {
        console.error(res.error);
        return;
      }
      setTeachingLocationList(res as TeachingLocation[]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTeachingLocations();
  }, []);

  const getTeachingLocationWardList = async (locationId: string) => {
    if (!locationId) return;
    setLoadingWards(true);
    try {
      const res = await getTeachingLocationWardsList(locationId);
      if ("error" in res) {
        console.error(res.error);
        return;
      }

      setTeachingLocationWardsList(res as Ward[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWards(false);
    }
  };

  const deleteTeacherHandler = async (address_id: number | undefined) => {
    try {
      if (!address_id) return;
      const res = (await deleteTeachingLocation(address_id)) as any;
      if (res.error) {
        console.error(res.error);
        toast(res.error, {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        return;
      }
      toast(res?.message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });

      // remove the deleted address from the list
      const updatedTeachingLocations = teacherData.teaching_locations.filter(
        (address: any) => address.teaching_location_id !== address_id
      );
      setTeacherData({
        ...teacherData,
        teaching_locations: updatedTeachingLocations,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setValidateProfile(true);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError({});
      const res = (await addNewTeachingLocation(values)) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        setLoading(false);
        return;
      }
      if (!res.error) {
        form.reset({
          ward_no_panchayat: "",
          teaching_location: "",
        });
        setTeachingLocationWardsList([]);
      }
      setValidateProfile(true);
      toast.success(res?.message);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5">
      {teacherData?.teaching_locations?.length === 0 && (
        <p className="text-muted-foreground text-sm mb-5">
          You haven&apos;t added any teaching locations yet.
        </p>
      )}
      {teacherData?.teaching_locations?.length > 0 && (
        <>
          <CardHeader className="px-0">
            <CardTitle>Your Current Teaching Locations</CardTitle>
            <CardDescription>
              Addresses where you are ready to teach.
            </CardDescription>
          </CardHeader>
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {teacherData?.teaching_locations?.map(
                (address: any, index: number) => (
                  <Card
                    key={index}
                    className={`group p-5  text-sm text-muted-foreground flex justify-between items-center gap-2 border-primary bg-secondary`}
                  >
                    <span>
                      {address.teaching_ward.ward_no_panchayat},{" "}
                      {address.teaching_location_list.location_name}
                    </span>
                    <Menubar className="bg-transparent border-none">
                      <MenubarMenu>
                        <MenubarTrigger>
                          <EllipsisVertical />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem
                            onClick={() => {
                              setSelectedAddressId(
                                address.teaching_location_id
                              );
                              setIsAlertDialogOpen(true);
                            }}
                            className="flex gap-2"
                          >
                            <Trash size={16} /> Delete
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                  </Card>
                )
              )}
              <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={setIsAlertDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the selected address.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteTeacherHandler(selectedAddressId)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </>
      )}
      <CardHeader className="mt-5 px-0">
        <CardTitle>Add New Teaching Location</CardTitle>
        <CardDescription>
          Add the address where you want to teach.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
          <div className="flex-1 space-y-5 w-full">
            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="teaching_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching Location</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(selection) => {
                        field.onChange(selection);
                        form.setValue("ward_no_panchayat", "");
                        getTeachingLocationWardList(selection);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Teaching Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachingLocationList.map(
                          ({ teaching_location_id, location_name }) => (
                            <SelectItem
                              key={teaching_location_id}
                              value={teaching_location_id.toString()}
                            >
                              {location_name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward_no_panchayat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward No / Panchayat</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!form.getValues("teaching_location")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Ward No / Panchayat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loadingWards ? (
                          <SelectItem disabled value="loading">
                            Loading...
                          </SelectItem>
                        ) : teachingLocationWardsList.length === 0 ? (
                          <SelectItem disabled value="no-data">
                            No Ward Found
                          </SelectItem>
                        ) : (
                          teachingLocationWardsList.map(
                            ({ teaching_ward_id, ward_no_panchayat }) => (
                              <SelectItem
                                key={teaching_ward_id.toString()}
                                value={teaching_ward_id.toString()}
                              >
                                {ward_no_panchayat}
                              </SelectItem>
                            )
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="!mt-5">
              {error.backendError && (
                <div className="text-sm font-medium text-destructive mb-2">
                  {error.backendError}
                </div>
              )}
              <div className="flex justify-end">
                {canUpdate && (
                  <Button
                    type="submit"
                    disabled={loading || form.formState.isSubmitting}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export const TeachingSubjects = ({ teacherData, canUpdate = true }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [teacherSubjects, setTeacherSubjects] = useState<
    { [key: string]: string | number }[]
  >([]);

  const [subjectList, setSubjectList] = useState<[]>([]);
  const [classList, setClassList] = useState<[]>([]);

  const { setValidateProfile } = useContext(DataValidationContext);

  const formSchema = z.object({
    subject_id: z.number(),
    class_id: z.number(),
    fee: z.number().min(0, "Fee must be greater than 0"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject_id: undefined,
      class_id: undefined,
      fee: undefined,
    },
  });

  const { reset:_reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = (await addTeacherSubject(values)) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        setLoading(false);
        return;
      } else {
        setError({});
        toast(res?.message, {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        setValidateProfile(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectsList = async () => {
    try {
      setLoading(true);
      const res = (await getSubjectList()) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        return;
      }
      setSubjectList(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getClass = async () => {
    try {
      setLoading(true);
      const res = (await getClassList()) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        return;
      }
      setClassList(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // const fetchSubjects = async () => {
  //     try {
  //         setLoading(true);
  //         const res = await getTeacherSubjects() as any;
  //         if (res.error) {
  //             setError({ backendError: res.error });
  //             console.error("Error", res.error);
  //             return;
  //         }
  //         setTeacherSubjects(res);
  //         setLoading(false);
  //     } catch (e) {
  //         console.error(e);
  //     }
  // }

  useEffect(() => {
    setTeacherSubjects(teacherData?.subjects || []);
  }, [teacherData]);

  const handleDeleteSubject = async (teacher_subject_id: string | number) => {
    try {
      setLoading(true);
      const res = (await deleteTeacherSubject(teacher_subject_id)) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        return;
      }
      toast(res?.message, {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      setValidateProfile(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubjectsList();
    getClass();
  }, []);

  return (
    <Card className="p-5">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          {/* <Spinner /> */}
          <Loader className="animate-spin" />
        </div>
      ) : (
        teacherSubjects.length > 0 && (
          <>
            <CardHeader className="px-0">
              <CardTitle>Teaching Subjects</CardTitle>
              <CardDescription>
                Add the subjects you are willing to teach.
              </CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {teacherSubjects.map((subject, index) => (
                <Card
                  key={index}
                  className={`group p-5  text-sm text-muted-foreground flex justify-between items-center gap-2 border-primary bg-secondary`}
                >
                  <div>
                    <div>Class: {subject?.class_name}</div>
                    <div> {subject?.subject_name} </div>
                    <div>Fee: {subject?.fee} </div>
                  </div>
                  <Menubar className="bg-transparent border-none">
                    <MenubarMenu>
                      <MenubarTrigger>
                        <EllipsisVertical />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem
                          className="flex gap-2"
                          onClick={() =>
                            handleDeleteSubject(subject.teacher_subject_id)
                          }
                        >
                          <Trash size={16} /> Delete
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </Card>
              ))}
            </div>
          </>
        )
      )}

      <CardHeader className="mt-5 px-0">
        <CardTitle>Add New Subject</CardTitle>
        <CardDescription>
          Add the subjects you are willing to teach.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">
          <div className="flex-1 space-y-5 w-full">
            <div className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="subject_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        const value = e;
                        // Only keep numeric values
                        const numericValue = value.replace(/\D/g, "");
                        field.onChange(Number(numericValue));
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjectList.map((subject: any, index: number) => (
                          <SelectItem key={index} value={subject.subject_id}>
                            {subject.subject_name}
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
                name="class_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        const value = e;
                        // Only keep numeric values
                        const numericValue = value.replace(/\D/g, "");
                        field.onChange(Number(numericValue));
                      }}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classList.map((classItem: any, index: number) => (
                          <SelectItem key={index} value={classItem.class_id}>
                            {classItem.class_name}
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
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the fee"
                        {...field}
                        onChange={(e:any) => {
                          const value = e.target.value;
                          // Only keep numeric values
                          const numericValue = value.replace(/\D/g, "");
                          field.onChange(Number(numericValue));
                        }}
                        readOnly={!canUpdate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="!mt-5">
              {error.backendError && (
                <div className="text-sm font-medium text-destructive mb-2">
                  {error.backendError}
                </div>
              )}
              {canUpdate && (
                <div className="flex justify-end">
                  <Button type="submit" className="" disabled={loading}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export const Documents = ({
  teacherData,
  canUpdate = true,
  canReadURL = false,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [documentType, setDocumentType] = useState<
    | "Aadhar"
    | "Signature"
    | "Educational"
    | "Experience"
    | "Marksheet"
    | "Other"
    | null
  >();
  const [documentTitle, setDocumentTitle] = useState<string>("");
  const [uploadingDocument, setUploadingDocument] = useState<boolean>(false);
  const [showTitleModalForDocument, setShowTitleModalForDocument] =
    useState<boolean>(false);

  const { setValidateProfile } = useContext(DataValidationContext);

  const handleDocumentUpload = async (e: any) => {
    setUploadingDocument(true);
    const file = e.target.files[0];
    if (
      documentType === "Signature" &&
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg"
    ) {
      toast(
        "Please upload a valid Signature Image. Image should be either png, jpeg, or jpg",
        {
          action: {
            label: "Close",
            onClick: () => {
              /* handle close action */
            },
          },
        }
      );
      setUploadingDocument(false);
      return;
    }
    if (!file) return;
    const formData = new FormData();
    formData.append("document", file);
    formData.append("document_type", documentType as string);
    formData.append("document_title", documentTitle as string);

    try {
      const res = (await uploadDocument(formData)) as any; // Assuming uploadDocument returns a Promise
      if (res.error) {
        console.error("Error", res.error);
        return;
      }
      setValidateProfile(true);
      setShowTitleModalForDocument(false);
      toast(res.message, {
        action: {
          label: "Close",
          onClick: () => {
            /* handle close action */
          },
        },
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      // Handle error appropriately (e.g., show an error toast)
    } finally {
      setUploadingDocument(false);
      // Assuming you have inputRef defined somewhere
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-2">
        <CardHeader className="px-0 flex-1">
          <CardTitle>Documents</CardTitle>
          <CardDescription>Upload all the required Documents.</CardDescription>
        </CardHeader>

        {canUpdate && (
          <Menubar className="bg-transparent border-none max-sm:flex-1">
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Button
                  disabled={uploadingDocument}
                  className="max-sm:flex-1 flex gap-2"
                >
                  <Plus size={16} /> Add New Document
                </Button>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  className="flex gap-2"
                  onClick={() => {
                    setDocumentType("Aadhar");
                    setDocumentTitle("Aadhar Card");
                    inputRef.current?.click();
                  }}
                >
                  Aadhar Card
                </MenubarItem>
                <MenubarItem
                  className="flex gap-2"
                  onClick={() => {
                    setDocumentType("Signature");
                    setDocumentTitle("Signature");
                    inputRef.current?.click();
                  }}
                >
                  Signature
                </MenubarItem>
                <MenubarItem
                  className="flex gap-2"
                  onClick={() => {
                    setDocumentType("Marksheet");
                    setDocumentTitle("");
                    setShowTitleModalForDocument(true);
                  }}
                >
                  Highest Education qualification (10th, 12th, UG, PG)
                </MenubarItem>
                <MenubarItem
                  className="flex gap-2"
                  onClick={() => {
                    setDocumentType("Marksheet");
                    setDocumentTitle("");
                    setShowTitleModalForDocument(true);
                  }}
                >
                  Other Education Certificate
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
        <Dialog
          open={showTitleModalForDocument}
          onOpenChange={(e) => setShowTitleModalForDocument(e)}
        >
          <DialogContent
            className="sm:max-w-[700px]"
            aria-describedby="Upload your document"
          >
            <DialogHeader>
              <DialogTitle>Upload Your Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Document Title
                </Label>
                <Input
                  id="name"
                  placeholder="Eg: Post Graduation Marksheet"
                  className="col-span-3"
                  onChange={(e:any) => setDocumentTitle(e.target.value)}
                  value={documentTitle}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <button
                  type="button"
                  className="col-span-4 mt-5 p-2 border-primary bg-primary text-white border rounded-md"
                  onClick={() => inputRef.current?.click()}
                >
                  Select a document to upload
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <input
          type="file"
          id="uploadDoc"
          ref={inputRef}
          onInput={(e) => {
            handleDocumentUpload(e);
          }}
          className="hidden"
        />
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          {teacherData?.documents?.map((doc: any, index: number) => (
            <Card
              key={index}
              className={`p-5 text-primary font-semibold flex justify-between items-center gap-2 `}
            >
              <span>{doc.document_title}</span>{" "}
              {canReadURL ? (
                <a
                  href={`${process.env.NEXT_PUBLIC_BACKEND}/teacher/documents/${doc.document_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary"
                >
                  View
                </a>
              ) : (
                <Check />
              )}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

////////////////////////////////////////////////////////////

const Teacher = () => {
  const [teacherData, setTeacherData] = useState<any>({});
  const [_loading, setLoading] = useState<boolean>(false);
  const [_changeImageLoading, setChangeImageLoading] = useState<boolean>(false);
  const [_error, setError] = useState<{ [key: string]: string }>({});

  const [validate, setValidate] = useState<boolean>(false);
  const [validateProfile, setValidateProfile] = useState<boolean>(false);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      const res = (await teacherProfile()) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        return;
      }
      setTeacherData(res);
      setLoading(false);
      setValidateProfile(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setValidateProfile(false);
    }
  };
  useEffect(() => {
    // Fetch Teacher Data
    fetchTeacherData();
  }, [validateProfile]);

  const ApplyForAccountVerification = ({ setTeacherData }: any) => {
    const [openVerifiationDialog, setOpenVerificationDialog] =
      useState<boolean>(false);
    const [readyToApply, setReadyToApply] = useState<boolean>(false);
    const [acceptedTermsAndCondition, setAcceptedTermsAndCondition] =
      useState<boolean>(false);
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [docsToCheck, setDocsToCheck] = useState<any>([]);

    const { validate, setValidate } = useContext(DataValidationContext);

    const checkApplicableForVerification = async () => {
      const res = (await checkForAccountVerification()) as any;
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        return;
      }
      setDocsToCheck(res);
    };

    // Initial mount effect
    useEffect(() => {
      checkApplicableForVerification();
    }, []);

    // Effect to trigger when validate state changes
    useEffect(() => {
      if (validate) {
        checkApplicableForVerification();
        setValidate(false);
      }
    }, [validate, setValidate]);

    const handlePayment = async (options: any) => {
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
      const loadScript = await loadRazorpayScript();
      if (!loadScript) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      options.handler = async (response: any) => {
        const verificationData = (await verifyTeacherPayment(response)) as any;
        setTeacherData((prev: any) => ({
          ...prev,
          is_verified: verificationData.verification_status,
        }));
        // const verificationData = await verification.json();
        if (verificationData.status === "success") {
          toast(
            "Payment Successful. Keep an Eye on your dashboard for any updates. We will verify your account soon.",
            {
              action: {
                label: "Close",
                onClick: () => {},
              },
            }
          );
        } else {
          toast(
            "Unable to save the payment status. Dont worry, we will update the payment status.",
            {
              action: {
                label: "Close",
                onClick: () => {},
              },
            }
          );
        }
      };
      const paymentObject = (window as any).Razorpay(options);
      paymentObject.open();
    };

    const applyForVerification = async () => {
      if (!acceptedTermsAndCondition) {
        setError({
          terms:
            "Please accept the terms and conditions to apply for verification",
        });
        return;
      }
      try {
        // Apply for account verification
        const res = (await initiatePaymentForTeacherVerification()) as any;
        if (res.error) {
          setError({ backendError: res.error });
          console.error("Error", res.error);
          return;
        }
        // setOpenVerificationDialog(false);
        if (res?.order_id) {
          setOpenVerificationDialog(false);
          handlePayment(res);
        }
        toast("Processing... Do not close the window", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
      setReadyToApply(docsToCheck.every((doc: any) => doc.completed));
    }, [docsToCheck]);

    return (
      <>
        <Card className="p-5 border-primary bg-secondary">
          <div className="flex flex-wrap gap-5 md:gap-2 lg:gap-5 md:items-center">
            <CardHeader className="flex-1 p-0 min-w-[200px]">
              <CardTitle className="leading-tight">
                Account Verification
              </CardTitle>
              <CardDescription className="md:hidden lg:block">
                Apply for Account Verification to complete your onboarding
                process
              </CardDescription>
            </CardHeader>
            <Button
              onClick={() => {
                setOpenVerificationDialog(true);
              }}
            >
              Apply for verification
            </Button>
            <CardDescription className="hidden md:block lg:hidden">
              Apply for Account Verification to complete your onboarding process
            </CardDescription>
          </div>
        </Card>
        <Dialog
          open={openVerifiationDialog}
          onOpenChange={setOpenVerificationDialog}
        >
          <DialogContent className="max-w-[90%] sm:max-w-[720px] rounded-lg ">
            <DialogHeader>
              <DialogTitle>Apply for Verification</DialogTitle>
              <DialogDescription>
                Complete all the necessory details to apply for account
                verification.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {docsToCheck.map((doc: any, index: number) => (
                <Card
                  key={index}
                  className={`p-5 text-primary font-semibold flex justify-between items-center gap-2 ${
                    doc.completed
                      ? "border-primary bg-secondary"
                      : "border-red-500 bg-red-200"
                  }`}
                >
                  <span>{doc.title}</span> {doc.completed ? <Check /> : <X />}
                </Card>
              ))}
            </div>
            {readyToApply ? (
              <>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="terms"
                    checked={acceptedTermsAndCondition}
                    onCheckedChange={(e: boolean) => {
                      setAcceptedTermsAndCondition(e);
                      setError((prev) => ({ ...prev, terms: "" }));
                    }}
                    className="data-[state=checked]:bg-slate-800 border-black"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    The information I am providing is correct to the best of my
                    knowledge. I agree to the{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-primary"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    of the platform.
                  </label>
                </div>
                {error.terms && (
                  <div className="text-sm text-red-500">{error.terms}</div>
                )}
              </>
            ) : (
              <div className="text-sm text-red-500">
                Please fill all the above mentioned details in your profile
                section to apply for account verification.
              </div>
            )}
            <DialogFooter>
              <div className="flex flex-wrap gap-2 text-sm items-center justify-end w-full">
                <Button
                  type="submit"
                  disabled={!readyToApply}
                  onClick={applyForVerification}
                >
                  Pay for verification
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const VerificationStatus = () => {
    return (
      <Card className="p-5 border-primary bg-secondary">
        <div className="flex flex-wrap gap-5 md:gap-2 lg:gap-5 md:items-center">
          <CardHeader className="flex-1 p-0 min-w-[200px]">
            <CardTitle className="leading-tight">
              Account Verification
            </CardTitle>
            <CardDescription className="md:hidden lg:block">
              Your account is under verification process. You will get a
              verification badge once your account is verified.{" "}
            </CardDescription>
          </CardHeader>
          <Button disabled>Verification in Process</Button>
          <CardDescription className="hidden md:block lg:hidden">
            Your account is under verification process.
          </CardDescription>
        </div>
      </Card>
    );
  };

  const updateProfilePic = async (photo: File | undefined) => {
    if (!photo) return;
    const formData = new FormData();
    formData.append("photo", photo);

    try {
      setChangeImageLoading(true);
      const res: any = await changeTeacherProfilePic(formData);
      if (res.error) {
        setError({ backendError: res.error });
        console.error("Error", res.error);
        setLoading(false);
        return;
      } else {
        setError({});
        if (res?.photo) {
          setTeacherData({ ...teacherData, photo: res?.photo });
        }
        toast(res?.message, {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setChangeImageLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-5">
        <div className="flex flex-wrap justify-center md:items-start gap-5">
          <div className="space-y-5 min-w-[250px] md:sticky top-24 max-h-fit p-5">
            <div className="relative ">
              <Image
                src={
                  teacherData.photo
                    ? `${process.env.NEXT_PUBLIC_BACKEND}/${teacherData.photo}`
                    : createSVGDataUrl(teacherData?.first_name?.[0] ?? "")
                }
                width={200}
                height={200}
                alt={`${teacherData?.first_name} ${teacherData?.middle_name} ${teacherData?.last_name}`}
                className="rounded-full text-primary"
                onError={(e) => {
                  e.currentTarget.src = createSVGDataUrl(
                    teacherData?.first_name?.[0] ?? ""
                  );
                }}
              />
              <label htmlFor="profilePic">
                <div className="absolute bottom-2 right-10 p-2 bg-white rounded-full drop-shadow-md">
                  <Pencil className=" w-4 h-4 " />
                  <input
                    id="profilePic"
                    type="file"
                    name="profilePic"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => updateProfilePic(e?.target?.files?.[0])}
                  />
                </div>
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {`${teacherData?.first_name || ""} ${
                  teacherData?.middle_name || ""
                } ${teacherData?.last_name || ""}`}{" "}
                {teacherData.is_verified ? (
                  <span className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 48 48"
                      className="inline-block ml-2 [&+*]:hover:opacity-100 "
                    >
                      <polygon
                        className="fill-primary dark:fill-primary-foreground"
                        points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                      ></polygon>
                      <polygon
                        fill="#fff"
                        points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                      ></polygon>
                    </svg>
                    <span className="select-none opacity-0 transition-opacity ease-in-out duration-500 absolute -top-6 -left-3 text-xs w-fit bg-slate-800 text-white font-normal py-1 px-3 rounded-md">
                      Verified
                    </span>
                  </span>
                ) : (
                  <></>
                )}
              </h1>
              <p className="text-gray-500">Teacher</p>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <DataValidationContext.Provider
              value={{
                validate,
                setValidate,
                validateProfile,
                setValidateProfile,
              }}
            >
              {teacherData?.is_verified === -1 && (
                <ApplyForAccountVerification setTeacherData={setTeacherData} />
              )}
              {teacherData?.is_verified === 0 && <VerificationStatus />}
              <TeacherUpdateForm teacherData={teacherData} />
              <ResidentialAddressForm teacherData={teacherData} />
              <PermanentAddressForm teacherData={teacherData} />
              <TeachingLocationPreference
                teacherData={teacherData}
                setTeacherData={setTeacherData}
              />
              <TeachingSubjects teacherData={teacherData} />
              <Documents teacherData={teacherData} />
            </DataValidationContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
