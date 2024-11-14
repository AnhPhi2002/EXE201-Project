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
  selectedDepartment: z.string().nonempty("Vui lòng chọn ngành"),
  selectedSemester: z.string().nonempty("Vui lòng chọn kỳ học"),
  selectedSubject: z.string().nonempty("Vui lòng chọn môn học"),
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
      selectedDepartment: "",
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
    <Modal title="Cập Nhật Tài Liệu" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Chọn Ngành</label>
            <select
              {...register("selectedDepartment")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Chọn Ngành</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.selectedDepartment && (
              <p className="text-red-500 text-xs">{errors.selectedDepartment.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Chọn Kỳ Học</label>
            <select
              {...register("selectedSemester")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
              disabled={!selectedDepartment}
            >
              <option value="">Chọn Kỳ Học</option>
              {filteredSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  {sem.name}
                </option>
              ))}
            </select>
            {errors.selectedSemester && (
              <p className="text-red-500 text-xs">{errors.selectedSemester.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Chọn Môn Học</label>
            <select
              {...register("selectedSubject")}
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
              disabled={!selectedSemester}
            >
              <option value="">Chọn Môn Học</option>
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

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">Tiêu Đề</label>
            <input
              {...register("title")}
              type="text"
              className="p-2 border rounded-md focus:border-blue-500 focus:outline-none"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

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

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700">Mô Tả</label>
          <textarea
            {...register("description")}
            className="p-2 border rounded-md w-full h-24 resize-none focus:border-blue-500 focus:outline-none"
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700">Đường Dẫn Tệp</label>
          <input
            {...register("fileUrls")}
            type="text"
            placeholder="Nhập các URL, cách nhau bằng dấu phẩy"
            className="p-2 border rounded-md w-full focus:border-blue-500 focus:outline-none"
          />
        </div>

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
