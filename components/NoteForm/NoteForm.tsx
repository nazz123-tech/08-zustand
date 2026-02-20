import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './NoteForm.module.css'
import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '../../lib/api';

const validationSchema = Yup.object().shape({
    title:Yup.string().min(3,"Too short").max(50,"Too long").required("Title is required"),
    content:Yup.string().max(500,"Too long"),
    tag:Yup.string().required("Tag is required").oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
})

interface NoteFormProps{
  onClose: () => void
}
  export interface NoteFormValues {
  title: string
  content: string
  tag: string
}

const initialValues:NoteFormValues={
    title: '',
    content: '',
    tag: 'Todo',
} 

export default function NoteForm({onClose}:NoteFormProps){
   const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onClose()
    },
  })
 return (
     <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        createMutation.mutate(values)
        resetForm()
      }}>
  {({ isSubmitting }) => (
    <Form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <Field
          id="title"
          name="title"
          type="text"
          className={css.input}
        />
        <ErrorMessage
          name="title"
          component="span"
          className={css.error}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <Field
          as="textarea"
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
        <ErrorMessage
          name="content"
          component="span"
          className={css.error}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <Field
          as="select"
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage
          name="tag"
          component="span"
          className={css.error}
        />
      </div>

      <div className={css.actions}>
        <button
          onClick={onClose}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          Create note
        </button>
      </div>
    </Form>
  )}
</Formik>
 )
}