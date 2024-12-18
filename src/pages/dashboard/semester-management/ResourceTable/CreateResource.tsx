import React, { useState, useEffect } from "react";
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

interface CreateResourceProps {
  departments: Department[];
  semesters: Semester[];
  subjects: Subject[];
  onCreate: (data: ResourceFormData) => void;
  onClose: () => void;
}

const CreateResource: React.FC<CreateResourceProps> = ({
  departments,
  semesters,
  subjects,
  onCreate,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const selectedSemester = watch("selectedSemester");

  useEffect(() => {
    setSelectedDepartment(watch("selectedDepartment"));
  }, [watch("selectedDepartment")]);

  const filteredSemesters = semesters.filter(
    (semester) => semester.department === selectedDepartment
  );

  const filteredSubjects = subjects.filter(
    (subject) => subject.semester === selectedSemester
  );

  const onSubmit = (data: ResourceFormData) => {
    const formattedData = {
      ...data,
      fileUrls: data.fileUrls ? data.fileUrls.split(",").map((url) => url.trim()).join(",") : "",
    };
    onCreate(formattedData);
    reset();
    onClose();
  };

  return (
    <Modal title="Tạo Tài Liệu" onClose={onClose}>
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
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
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
            Tạo Mới
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateResource;
