
"use client"
import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createNote } from '../../lib/api'
import {useNoteDraftStore} from '../../lib/noteStore'


export interface NoteFormValues {
  title: string
  content: string
  tag: string
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient()
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
	
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {

    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const handleCancel = () => router.push('/notes/filter/all');

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      clearDraft()
      router.push('/notes/filter/all')
    },
  })

  async function formAction(formData: FormData) {
    const values: NoteFormValues = {
      title: String(formData.get('title') || ''),
      content: String(formData.get('content') || ''),
      tag: String(formData.get('tag') || 'Todo'),
    }

    await createMutation.mutateAsync(values)
  }

  return (
    <form action={formAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          onChange={handleChange}
          defaultValue={draft?.content}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          defaultValue="Todo"
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  )
}