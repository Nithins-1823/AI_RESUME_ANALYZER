import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://nlysefeyiarjohgpsmbr.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seXNlZmV5aWFyam9oZ3BzbWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTgwODgsImV4cCI6MjA5MDc5NDA4OH0.1JgAXmsza9a1yP6QqZc_8LN0RJfWTr03LQHd2UVf6Fo'
    );
  }
  // 📂 STORAGE (optional future use)
  async uploadFile(file: File) {
    const filePath = `resumes/${Date.now()}_${file.name}`;

    const { data, error } = await this.supabase.storage
      .from('resumes')
      .upload(filePath, file);

    if (error) throw error;

    return data;
  }

  getClient() {
    return this.supabase;
  }
}