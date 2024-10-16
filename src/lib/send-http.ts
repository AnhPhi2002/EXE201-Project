import { toast } from 'sonner';

export async function sendHttp(axiosApi: any, data?: any, id: string = '', message?: { success: string; error: string }) {
  try {
    const res = await axiosApi(data, id);
    if (res) toast.success(res.data.message || message?.success || 'Success');
    return res;
  } catch (error: any) {
    toast.error(error.response.data.message || message?.error || 'Error');
  }
}
