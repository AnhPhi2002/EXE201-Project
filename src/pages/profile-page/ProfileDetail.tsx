import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Crown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, updateUserProfile } from '@/lib/api/redux/userSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner'; // Import toast từ sonner

const schema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  email: z.string().email({ message: 'Email phải hợp lệ.' }),
  phone: z.string().min(10, { message: 'Số điện thoại phải có ít nhất 10 chữ số.' }),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Giới tính là bắt buộc.' }),
  birthDate: z.date(),
  about: z.string().max(500, { message: 'Giới thiệu phải dưới 500 ký tự.' }),
  avatar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const ProfileDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'male',
      birthDate: new Date('2000-01-01'),
      about: '',
      avatar: '',
    },
  });
  const { handleSubmit, control, setValue, formState: { errors } } = methods;
  const [profilePicture, setProfilePicture] = useState(profile?.avatar || '');

  useEffect(() => {
    dispatch(fetchUserInfo()).then((action) => {
      if (fetchUserInfo.fulfilled.match(action)) {
        const userData = action.payload;
        setValue('name', userData.name);
        setValue('email', userData.email);
        setValue('phone', userData.phone || '');
        setValue('gender', userData.gender || 'male');
        setValue('birthDate', userData.birthDate ? new Date(userData.birthDate) : new Date('2000-01-01'));
        setValue('about', userData.about || '');
        setProfilePicture(userData.avatar || '');
        setValue('avatar', userData.avatar || '');
      }
    });
  }, [dispatch, setValue]);

  const openCloudinaryWidget = () => {
    if ((window as any).cloudinary) {
      (window as any).cloudinary.openUploadWidget(
        {
          cloudName: "dbezyvjzm",
          uploadPreset: "learnup",
          sources: ["local", "camera"],
          cropping: true,
          multiple: false,
          defaultSource: "local",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const uploadedUrl = result.info.secure_url;
            setProfilePicture(uploadedUrl);
            setValue('avatar', uploadedUrl);
          }
        }
      );
    } else {
      console.error("Cloudinary Widget script not loaded.");
    }
  };

  const onSubmit = (data: FormData) => {
    if (profile?._id) {
      dispatch(updateUserProfile({ ...data, _id: profile._id })).then((action) => {
        if (updateUserProfile.fulfilled.match(action)) {
          toast.success("Cập nhật hồ sơ thành công!");
          navigate('/profile');
        } else {
          toast.error("Cập nhật hồ sơ thất bại.");
        }
      });
    } else {
      toast.error("Không tìm thấy ID người dùng.");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center pb-32">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-lg ">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="w-20 h-20 mr-4 border-4 border-indigo-500 shadow-lg">
              <AvatarImage src={profilePicture || "https://example.com/default-avatar.jpg"} alt="Ảnh đại diện" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Cài đặt tài khoản
              {profile?.role === 'member_premium' && (
                <span title="Thành viên Premium">
                  <Crown className="ml-2 text-yellow-500 w-6 h-6" />
                </span>
              )}
            </h1>
          </div>
          <Button
            onClick={openCloudinaryWidget}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Thay đổi ảnh đại diện
          </Button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tên của bạn" />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="you@example.com" />
                  </FormControl>
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0123456789" />
                  </FormControl>
                  {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value ? field.value.toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {errors.birthDate && <FormMessage>{errors.birthDate.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="about"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Giới thiệu</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Giới thiệu về bản thân..."
                      className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {errors.about && <FormMessage>{errors.about.message}</FormMessage>}
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <Button type="submit" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
                <Save className="mr-2 w-4 h-4" />
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileDetail;
