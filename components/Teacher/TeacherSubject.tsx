/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { teacherProfile } from "@/lib/API/Teacher";
import { Select as MUISelect, MenuItem, InputLabel, FormControl as MUIFormControl, Checkbox, ListItemText, OutlinedInput } from "@mui/material";

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

  addTeacherSubject,

  deleteTeacherSubject,

  getClassList,
  getSubjectList,

} from "@/lib/API/Teacher";

import { zodResolver } from "@hookform/resolvers/zod";
import {

  EllipsisVertical,
  Loader,
  Trash,
} from "lucide-react";

import {

  useEffect,

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

type Subject= {
  subject_id: number,
  subject_name: string

}
type SubjectList = Subject[];
export const TeachingSubjects = ({ canUpdate = true }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [teacherSubjects, setTeacherSubjects] = useState<
    { [key: string]: string | number }[]
  >([]);
  const [isSubject, setIsSubject] = useState<boolean>(false);

  const [isOpenClass, setIsOpenClass] = useState<boolean>(false);

  const [isOpenSubject, setSubjectOpen] = useState(false);
  const [subjectList, setSubjectList] = useState<SubjectList>([]);
  const [classList, setClassList] = useState<[]>([]);

  // const { setValidateProfile } = useContext(DataValidationContext);

  const formSchema = z.object({
    subject_id: z.array(z.number()).min(1, "Please Atleast one subject"),
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

  const { reset: _reset } = form;

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
            onClick: () => { },
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
      console.log("This is teacher subject");
      console.log(res);


      setTeacherSubjects(res.subjects);

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

    const fetchData = async () => {
      await fetchTeacherData();
    }
    fetchData();

  }, [validateProfile]);

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
          onClick: () => { },
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
        teacherSubjects?.length > 0 && (
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
            <div onBlur={() => setIsSubject(!isSubject)} className="flex flex-wrap gap-5 [&>*]:flex-1 [&>*]:min-w-[200px]">
              <FormField
                control={form.control}
                name="subject_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <MUIFormControl fullWidth>
                      {!isOpenSubject && (
                        <InputLabel
                          sx={{
                            color: "#94A3B8",
                          }} id="subject-select-label">Select Subjects</InputLabel>
                      )}
                      <MUISelect
                        labelId="subject-select-label"
                        multiple
                        value={field.value || []}
                        onChange={(e) => field.onChange(e.target.value)}
                        input={<OutlinedInput label="Select Subjects" />}
                        onOpen={() => setSubjectOpen(true)}
                        // onClose={() => setOpen(false)}
                        renderValue={(selected) =>
                          subjectList
                            .filter((s) => selected.includes(s.subject_id))
                            .map((s) => s.subject_name)
                            .join(", ")
                        }
                        sx={{
                          // backgroundColor: "background.paper",
                          color: "text.secondary", // This affects label, but not the input text directly

                          borderRadius: "0.5rem",

                          // Change input text color
                          "& .MuiInputBase-input": {
                            color: "white", // or any color you want for the text
                          },

                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                            borderWidth: "2px",
                          },
                        }}

                      >
                        {subjectList.map((subject) => (
                          <MenuItem
                            key={subject.subject_id}
                            value={subject.subject_id}
                            sx={{
                              "&.Mui-selected": {

                                backgroundColor: "rgba(99, 102, 241, 0.1) !important",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "rgba(99, 102, 241, 0.2) !important",
                              },
                            }}
                          >
                            <Checkbox checked={field.value?.includes(subject.subject_id)} />
                            <ListItemText primary={subject.subject_name} />
                          </MenuItem>
                        ))}
                      </MUISelect>
                    </MUIFormControl>
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


                    <MUIFormControl fullWidth>
                      {
                        !isOpenClass &&
                        (
                          <InputLabel
                            sx={{ color: "#94A3B8" }}
                            id="class-select-label"
                          >
                            Select Class
                          </InputLabel>

                        )
                      }


                      <MUISelect
                        onOpen={() => setIsOpenClass(true)}

                        labelId="class-select-label"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        input={<OutlinedInput label="Select Class" />} // must match InputLabel
                        label="Select Class" // <<< ADD THIS LINE
                        sx={{
                          color: "text.primary",
                          borderRadius: "0.5rem",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                          },
                          "& .MuiInputBase-input": {
                            color: "white", // or any color you want for the text
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#94A3B8",
                            borderWidth: "2px",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              color: "text.primary",
                              borderRadius: "0.5rem",
                              boxShadow: 3,
                            },
                          },
                        }}
                      >
                        {classList.map((classItem: any) => (
                          <MenuItem
                            key={classItem.class_id}
                            value={classItem.class_id}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "rgba(99, 102, 241, 0.1) !important",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "rgba(99, 102, 241, 0.2) !important",
                              },
                            }}
                          >
                            {classItem.class_name}
                          </MenuItem>
                        ))}
                      </MUISelect>
                    </MUIFormControl>
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
                    <FormControl style={
                      {
                        borderColor: "#94A3B8",
                        borderWidth: "2px",
                        height: "52px",
                        fontSize: "16px"
                      }
                    }>
                      <Input

                        placeholder="Enter the fee"
                        {...field}
                        onChange={(e: any) => {
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
export default TeachingSubjects;