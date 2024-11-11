import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Crown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { fetchUserInfo, updateUserProfile } from '@/lib/api/redux/userSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Email must be a valid email.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  birthDate: z.date(),
  about: z.string().max(500, { message: 'About must be less than 500 characters.' }),
  avatar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const ProfileDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'male',
      birthDate: new Date('2000-01-01'), // Cập nhật defaultValue thành birthDate
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
          alert("Profile updated successfully!");
          navigate('/profile'); // Điều hướng về trang /profile sau khi cập nhật thành công
        } else {
          alert("Failed to update profile.");
        }
      });
    } else {
      alert("User ID not found.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-18" style={{ padding: '100px 0' }}>
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-lg mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="w-20 h-20 mr-4 border-4 border-indigo-500 shadow-lg">
              <AvatarImage src={profilePicture || "https://example.com/default-avatar.jpg"} alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Account Settings
              {profile?.role === 'member_premium' && (
                <span title="Premium Member">
                  <Crown className="ml-2 text-yellow-500 w-6 h-6" />
                </span>
              )}
            </h1>
          </div>
          <Button
            onClick={openCloudinaryWidget}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Change Profile Picture
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1234567890" />
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
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
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
                  <FormLabel>Date of Birth</FormLabel>
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
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself..."
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
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileDetail;
