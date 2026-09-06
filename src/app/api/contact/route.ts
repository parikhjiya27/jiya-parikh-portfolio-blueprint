import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    const { name, email, number, message } = await request.json();

    if (!supabaseUrl || !supabaseKey || !supabase) {
      console.warn('Supabase not configured; continuing in demo mode.');

      if (resendApiKey) {
        try {
          const resend = new Resend(resendApiKey);
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'jiyaparikh2627@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e8ded8; border-radius: 12px;">
                <h2 style="color: #3d3d3d; border-bottom: 2px solid #c4a7b3; padding-bottom: 10px;">New Message Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${number || 'N/A'}</p>
                <div style="margin-top: 20px; padding: 15px; background-color: #fdf8f5; border-radius: 8px;">
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <p style="font-size: 12px; color: #6b6b6b; margin-top: 20px;">Sent from your portfolio website.</p>
              </div>
            `,
          });
        } catch (err) {
          console.error('Resend notification failed:', err);
        }
      }

      return NextResponse.json(
        { message: 'Message sent successfully in demo mode' },
        { status: 200 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save to Supabase
    const { data, error: supabaseError } = await supabase
      .from('messages')
      .insert([
        { 
          name, 
          email, 
          number: number || null, 
          message 
        }
      ])
      .select();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: `Database error: ${supabaseError.message}` },
        { status: 500 }
      );
    }

    // 2. Send Email Notification via Resend
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { error: emailError } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'jiyaparikh2627@gmail.com',
          subject: `New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e8ded8; border-radius: 12px;">
              <h2 style="color: #3d3d3d; border-bottom: 2px solid #c4a7b3; padding-bottom: 10px;">New Message Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${number || 'N/A'}</p>
              <div style="margin-top: 20px; padding: 15px; background-color: #fdf8f5; border-radius: 8px;">
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #6b6b6b; margin-top: 20px;">Sent from your portfolio website.</p>
            </div>
          `,
        });

        if (emailError) {
          console.error('Resend email error:', emailError);
        }
      } catch (err) {
        console.error('Resend notification failed:', err);
      }
    } else {
      console.warn('RESEND_API_KEY is missing, skipping email notification');
    }

    return NextResponse.json(
      { message: 'Message sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
