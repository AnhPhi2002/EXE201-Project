import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const subjectSchema = z.object({
  name: z.string().min(2, "Tên môn học phải có ít nhất 2 ký tự").max(50, "Tên môn học quá dài"),
  semester: z.string().min(1, "Vui lòng chọn học kỳ"),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface UpdateSubjectProps {
  subject: Subject;
  departments: Department[];
  semesters: Semester[];
  onUpdate: (data: SubjectFormData) => void;
  onClose: () => void;
}

const UpdateSubject: React.FC<UpdateSubjectProps> = ({ subject, departments, semesters, onUpdate, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: subject.name,
      semester: subject.semester,
    },
  });

  const departmentId = semesters.find((sem) => sem.id === subject.semester)?.department || "";
  const filteredSemesters = semesters.filter((sem) => sem.department === departmentId);

  const onSubmit = (data: SubjectFormData) => {
    onUpdate(data);
    onClose();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Cập nhật môn học</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên môn học</label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phòng ban</label>
          <input
            type="text"
            value={departments.find((dept) => dept.id === departmentId)?.name || "N/A"}
            disabled
            className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn học kỳ</label>
          <select {...register("semester")} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
            <option value="">Chọn học kỳ</option>
            {filteredSemesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))}
          </select>
          {errors.semester && <p className="text-red-500 text-sm">{errors.semester.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSubject;
