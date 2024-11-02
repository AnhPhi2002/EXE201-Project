import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";

interface Department {
  id: string;
  name: string;
}

interface Semester {
  id: string;
  name: string;
  department: string;
}

interface Subject {
  id: string;
  name: string;
  semester: string;
}

interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrls?: string[];
  type: "pdf" | "video" | "document";
  allowedRoles?: ("member_free" | "member_premium")[];
  subject: string;
}

const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  type: z.enum(["pdf", "video", "document"]),
  fileUrls: z.string().optional(),
  allowedRoles: z.enum(["member_free", "member_premium"]).optional(),
  selectedDepartment: z.string().optional(),
  selectedSemester: z.string().optional(),
  selectedSubject: z.string().optional(),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

interface UpdateResourceProps {
  resource: Resource;
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  onUpdate: (data: Resource) => void;
  onClose: () => void;
}

const UpdateResource: React.FC<UpdateResourceProps> = ({
  resource,
  departments,
  semesters,
  subjects,
  onUpdate,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: resource.title,
      description: resource.description,
      type: resource.type,
      fileUrls: resource.fileUrls ? resource.fileUrls.join(", ") : "",
      allowedRoles: resource.allowedRoles?.[0],
      selectedDepartment: "", // default to an empty string
      selectedSemester: "",
      selectedSubject: resource.subject,
    },
  });

  const selectedDepartment = watch("selectedDepartment");
  const selectedSemester = watch("selectedSemester");

  useEffect(() => {
    setValue("title", resource.title);
    setValue("description", resource.description || "");
    setValue("type", resource.type);
    setValue("fileUrls", resource.fileUrls ? resource.fileUrls.join(", ") : "");
    setValue("allowedRoles", resource.allowedRoles?.[0] || undefined);
    setValue("selectedSubject", resource.subject);
  }, [resource, setValue]);

  const filteredSemesters = semesters.filter((sem) => sem.department === selectedDepartment);
  const filteredSubjects = subjects.filter((sub) => sub.semester === selectedSemester);

  const onSubmit = (data: ResourceFormData) => {
    const updatedData = {
      ...data,
      fileUrls: data.fileUrls ? data.fileUrls.split(",").map((url) => url.trim()) : undefined,
      id: resource.id,
      subject: data.selectedSubject,
    };
    onUpdate(updatedData as Resource);
    onClose();
  };

  return (
    <Modal title="Update Resource" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input {...register("title")} type="text" className="p-2 border rounded-md w-full" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <label className="block text-sm font-medium mt-4">Type</label>
            <select {...register("type")} className="p-2 border rounded-md w-full">
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

            <label className="block text-sm font-medium mt-4">Select Role</label>
            <select {...register("allowedRoles")} className="p-2 border rounded-md w-full">
              <option value="">None</option>
              <option value="member_free">Member Free</option>
              <option value="member_premium">Member Premium</option>
            </select>
            {errors.allowedRoles && (
              <p className="text-red-500 text-sm">{errors.allowedRoles.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register("description")} className="p-2 border rounded-md w-full h-52 resize-none" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

            <label className="block text-sm font-medium mt-4">File URLs</label>
            <input
              {...register("fileUrls")}
              type="text"
              placeholder="Enter URLs separated by commas"
              className="p-2 border rounded-md w-full"
            />
            {errors.fileUrls && <p className="text-red-500 text-sm">{errors.fileUrls.message}</p>}

            {/* Department Selection */}
            <label className="block text-sm font-medium mt-4">Select Department</label>
            <select
              {...register("selectedDepartment")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.selectedDepartment && (
              <p className="text-red-500 text-xs">{errors.selectedDepartment.message}</p>
            )}

            {/* Semester Selection */}
            <label className="block text-sm font-medium mt-4">Select Semester</label>
            <select
              {...register("selectedSemester")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
              disabled={!selectedDepartment}
            >
              <option value="">Select Semester</option>
              {filteredSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
            {errors.selectedSemester && (
              <p className="text-red-500 text-xs">{errors.selectedSemester.message}</p>
            )}

            {/* Subject Selection */}
            <label className="block text-sm font-medium mt-4">Select Subject</label>
            <select
              {...register("selectedSubject")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
              disabled={!selectedSemester}
            >
              <option value="">Select Subject</option>
              {filteredSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.selectedSubject && (
              <p className="text-red-500 text-xs">{errors.selectedSubject.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateResource;
