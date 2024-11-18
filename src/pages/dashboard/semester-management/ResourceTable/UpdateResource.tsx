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
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự").optional(),
  type: z.enum(["pdf", "video", "document"]),
  fileUrls: z.string().optional(),
  allowedRoles: z.enum(["member_free", "member_premium"]).optional(),
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
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: resource.title,
      description: resource.description,
      type: resource.type,
      fileUrls: resource.fileUrls ? resource.fileUrls.join(", ") : "",
      allowedRoles: resource.allowedRoles?.[0],
    },
  });

  // Đặt giá trị mặc định cho form
  useEffect(() => {
    setValue("title", resource.title);
    setValue("description", resource.description || "");
    setValue("type", resource.type);
    setValue("fileUrls", resource.fileUrls ? resource.fileUrls.join(", ") : "");
    setValue("allowedRoles", resource.allowedRoles?.[0] || undefined);
  }, [resource, setValue]);

  const onSubmit = (data: ResourceFormData) => {
    const updatedData = {
      ...data,
      fileUrls: data.fileUrls ? data.fileUrls.split(",").map((url) => url.trim()) : undefined,
      id: resource.id,
      subject: resource.subject,
    };
    onUpdate(updatedData as Resource);
    onClose();
  };

  // Lấy Ngành, Kỳ học, và Môn học từ dữ liệu
  const currentSubject = subjects.find((sub) => sub.id === resource.subject);
  const currentSemester = semesters.find((sem) => sem.id === currentSubject?.semester);
  const currentDepartment = departments.find((dept) => dept.id === currentSemester?.department);

  return (
    <Modal title="Cập Nhật Tài Liệu" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department Field (Read-Only) */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Ngành</label>
            <input
              type="text"
              value={currentDepartment?.name || "N/A"}
              disabled
              className="p-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Semester Field (Read-Only) */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Kỳ học</label>
            <input
              type="text"
              value={currentSemester?.name || "N/A"}
              disabled
              className="p-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Subject Field (Read-Only) */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Môn học</label>
            <input
              type="text"
              value={currentSubject?.name || "N/A"}
              disabled
              className="p-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Title Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tiêu Đề</label>
            <input
              {...register("title")}
              type="text"
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          {/* Type Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Loại Tài Liệu</label>
            <select
              {...register("type")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="document">Tài Liệu</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
          </div>

          {/* Allowed Roles Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Vai Trò</label>
            <select
              {...register("allowedRoles")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Không có</option>
              <option value="member_free">Thành Viên Miễn Phí</option>
              <option value="member_premium">Thành Viên Cao Cấp</option>
            </select>
            {errors.allowedRoles && (
              <p className="text-red-500 text-xs">{errors.allowedRoles.message}</p>
            )}
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700">Mô Tả</label>
          <textarea
            {...register("description")}
            className="p-2 border rounded-md w-full h-24 resize-none focus:border-blue-500 focus:outline-none"
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        {/* File URLs Field */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700">Đường Dẫn Tệp</label>
          <input
            {...register("fileUrls")}
            type="text"
            placeholder="Nhập các URL, cách nhau bằng dấu phẩy"
            className="p-2 border rounded-md w-full focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Cập Nhật
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateResource;
