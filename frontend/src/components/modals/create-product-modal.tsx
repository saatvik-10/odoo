'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProductSchema,
  type CreateProduct,
} from '@/validators/product.validator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api';
import { Plus, Trash2, Loader2, Upload } from 'lucide-react';
import Cookies from 'js-cookie';
import z from 'zod';

// Local form schema (can extend if needed) – images at least one string
const formSchema = createProductSchema.extend({
  images: z
    .array(z.string().min(1, 'Image URL required'))
    .min(1, 'At least one image'),
});

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (product: any) => void;
}

export function CreateProductModal({
  open,
  onOpenChange,
  onCreated,
}: CreateProductModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);

  const form = useForm<CreateProduct>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      price: { hourly: 1, daily: 1, monthly: 1 },
      specialPrices: [],
      extraPricing: { hourly: 1, daily: 1, monthly: 1 },
      images: [''],
      stock: 0,
      public: false,
    },
  });

  const addSpecialPrice = () => {
    const current = form.getValues('specialPrices') || [];
    form.setValue('specialPrices', [
      ...current,
      { hourly: 1, daily: 1, monthly: 1 },
    ]);
  };
  const removeSpecialPrice = (idx: number) => {
    const current = form.getValues('specialPrices') || [];
    form.setValue(
      'specialPrices',
      current.filter((_, i) => i !== idx)
    );
  };

  const addImage = () => {
    const current = form.getValues('images') || [];
    form.setValue('images', [...current, '']);
  };
  const removeImage = (idx: number) => {
    const current = form.getValues('images') || [];
    if (current.length === 1) return; // keep at least one
    form.setValue(
      'images',
      current.filter((_, i) => i !== idx)
    );
  };

  const handleImageUpload = async (idx: number, file: File) => {
    // Check if user is authenticated
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    
    if (!token) {
      setError('You must be logged in to upload images. Please log in and try again.');
      return;
    }
    
    if (role !== 'vendor') {
      setError('Only vendors can upload product images.');
      return;
    }
    
    setUploadingImage(idx);
    try {
      const response = await api.product.uploadMedia(file);
      console.log('Upload response:', response);

      let imageUrl = '';
      //   if (Array.isArray(response) && response.length > 0) {
      imageUrl = response[0];
      //   } else if (typeof response === 'string') {
      //     imageUrl = response;
      //   } else {
      //     imageUrl = (response as any)?.url || (response as any)?.data?.url;
      //   }

      //   if (!imageUrl || typeof imageUrl !== 'string') {
      //     throw new Error('No valid URL returned from upload');
      //   }

      const currentImages = form.getValues('images') || [];
      const updatedImages = [...currentImages];
      updatedImages[idx] = imageUrl;
      form.setValue('images', updatedImages);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(null);
    }
  };

  const onSubmit = async (values: CreateProduct) => {
    setSubmitting(true);
    setError(null);
    try {
      const payload: CreateProduct = {
        ...values,
        images: values.images.filter((i) => i.trim() !== ''),
        specialPrices: (values.specialPrices || []).map((sp) => ({
          hourly: Number(sp.hourly),
          daily: Number(sp.daily),
          monthly: Number(sp.monthly),
        })),
        price: {
          hourly: Number(values.price.hourly),
          daily: Number(values.price.daily),
          monthly: Number(values.price.monthly),
        },
        extraPricing: {
          hourly: Number(values.extraPricing.hourly),
          daily: Number(values.extraPricing.daily),
          monthly: Number(values.extraPricing.monthly),
        },
      } as any;
      const created = await api.product.createProduct(payload);
      onCreated?.(created);
      form.reset();
      onOpenChange(false);
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!submitting) onOpenChange(o);
      }}
    >
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-4'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='category'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder='Category' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder='Describe the product'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className='text-sm font-medium mb-2'>Base Pricing</p>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {(['hourly', 'daily', 'monthly'] as const).map((k) => (
                  <FormField
                    key={k}
                    name={`price.${k}` as any}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='capitalize'>{k}</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-sm font-medium'>Special Prices</p>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addSpecialPrice}
                >
                  <Plus className='h-4 w-4 mr-1' />
                  Add
                </Button>
              </div>
              {(form.watch('specialPrices') || []).length === 0 && (
                <p className='text-xs text-muted-foreground'>None added.</p>
              )}
              <div className='space-y-3'>
                {form.watch('specialPrices')?.map((sp, idx) => (
                  <div
                    key={idx}
                    className='grid grid-cols-2 md:grid-cols-5 gap-3 items-end border rounded-md p-3'
                  >
                    {(['hourly', 'daily', 'monthly'] as const).map((k) => (
                      <FormField
                        key={k}
                        name={`specialPrices.${idx}.${k}` as any}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs capitalize'>
                              {k}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                min={1}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type='button'
                      size='icon'
                      variant='ghost'
                      onClick={() => removeSpecialPrice(idx)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className='text-sm font-medium mb-2'>Extra Pricing</p>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {(['hourly', 'daily', 'monthly'] as const).map((k) => (
                  <FormField
                    key={k}
                    name={`extraPricing.${k}` as any}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='capitalize'>{k}</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-sm font-medium'>Images</p>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={addImage}
                >
                  <Plus className='h-4 w-4 mr-1' />
                  Add
                </Button>
              </div>
              {form.watch('images').map((img, idx) => (
                <FormField
                  key={idx}
                  name={`images.${idx}` as any}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className='mb-2'>
                      <FormLabel className='text-xs'>
                        Image #{idx + 1}
                      </FormLabel>
                      <div className='flex gap-2'>
                        <FormControl>
                          <Input
                            placeholder='Image URL or upload file...'
                            {...field}
                          />
                        </FormControl>
                        <div className='flex gap-1'>
                          <Button
                            type='button'
                            variant='outline'
                            size='icon'
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement)
                                  .files?.[0];
                                if (file) {
                                  handleImageUpload(idx, file);
                                }
                              };
                              input.click();
                            }}
                            disabled={uploadingImage === idx}
                            title='Upload image'
                          >
                            {uploadingImage === idx ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                              <Upload className='h-4 w-4' />
                            )}
                          </Button>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => removeImage(idx)}
                            disabled={form.watch('images').length === 1}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className='grid grid-cols-2 gap-4 items-start'>
              <FormField
                name='stock'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='public'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Public</FormLabel>
                    <FormControl>
                      <div className='flex items-center gap-2 h-10 px-3 border rounded-md'>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(v) => field.onChange(!!v)}
                        />
                        <span className='text-sm'>Visible</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && <p className='text-sm text-destructive'>{error}</p>}
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProductModal;
