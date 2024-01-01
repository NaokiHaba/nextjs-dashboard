'use server';

import { z } from 'zod';
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),

    // coerceで強制的にnumberに変換
    amount: z.coerce.number(),
    status: z.enum([ 'paid', 'pending' ]),
    date: z.string()
})

// omitでidとdatesを省略してスキーマを作成
const CreateInvoice = FormSchema.omit({id: true, date: true})

const UpdateInvoice = FormSchema.omit({
    id: true,
    date: true
})

export async function createInvoice(formData: FormData) {
    const {customerId, amount, status} = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    const amountInCents = amount * 100

    await sql`
        INSERT INTO invoices (customer_id, amount, status)
        VALUES (${customerId}, ${amountInCents}, ${status})
    `

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const {customerId, amount, status} = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    const amountInCents = amount * 100

    await sql`
        UPDATE invoices
        SET customer_id = ${customerId},amount = ${amountInCents},status = ${status}
        WHERE id = ${id}
    `

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`
        DELETE FROM invoices WHERE id = ${id}
    `

    revalidatePath('/dashboard/invoices');
}