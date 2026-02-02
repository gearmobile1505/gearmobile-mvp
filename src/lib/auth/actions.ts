'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const userType = formData.get('userType') as string
  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        phone: formData.get('phone') as string,
        user_type: userType,
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  // Insert user record into users table with user_type
  if (authData.user) {
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        full_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        phone_number: formData.get('phone') as string,
        user_type: userType,
      })

    if (dbError) {
      console.error('Error creating user record:', dbError)
      // Don't fail signup if user record creation fails
    }
  }

  // Redirect based on user type
  if (userType === 'renter' || userType === 'both') {
    redirect('/dashboard')
  } else {
    redirect('/listings')
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/listings')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}

export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserType() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  const { data } = await supabase
    .from('users')
    .select('user_type')
    .eq('id', user.id)
    .single()
  
  return data?.user_type || 'customer'
}
