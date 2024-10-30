import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Crown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
  dob: z.string().nonempty({ message: 'Date of birth is required.' }),
  about: z.string().max(500, { message: 'About must be less than 500 characters.' }),
});

type FormData = z.infer<typeof schema>;

const ProfileDetail: React.FC = () => {
  const [profilePicture, setProfilePicture] = React.useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  );
  const [isPremium, setIsPremium] = React.useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '',
      gender: 'male',
      dob: '',
      about: '',
    },
  });

  const { handleSubmit, control, formState: { errors } } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleUpgradeToPremium = () => {
    setIsPremium(true);
  };

  const handleProfilePictureUpdate = () => {
    setProfilePicture('https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-18">
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-lg mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="w-20 h-20 mr-4 border-4 border-indigo-500 shadow-lg">
              <AvatarImage src={profilePicture} alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold text-gray-900">
              Account Settings
              {isPremium && <Crown className="inline-block ml-2 text-yellow-500 w-6 h-6" />}
            </h1>
          </div>
          <div>
            {!isPremium && (
              <Button onClick={handleUpgradeToPremium} className="text-indigo-600">
                Upgrade to Premium
              </Button>
            )}
            <Button onClick={handleProfilePictureUpdate} className="text-indigo-600 ml-4">
              Change Profile Picture
            </Button>
          </div>
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
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormDescription>Your public display name.</FormDescription>
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
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormDescription>We'll never share your email with anyone else.</FormDescription>
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
                    <Input
                      placeholder="1234567890"
                      {...field}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormDescription>Your contact number.</FormDescription>
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
                  <FormDescription>Select your gender.</FormDescription>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {errors.dob && <FormMessage>{errors.dob.message}</FormMessage>}
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
                      placeholder="Tell us about yourself..."
                      {...field}
                      className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  <FormDescription>A short description about you.</FormDescription>
                  {errors.about && <FormMessage>{errors.about.message}</FormMessage>}
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <Button
                type="submit"
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
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
