"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,

} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"



const authFormSchema = (type: FormType) => {
	return z.object({
		name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(3)
	})
}

const AuthForm = ({ type }: { type: FormType }) => {

	const router = useRouter()

	const formSchema = authFormSchema(type)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: '',
			password: ''
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === 'sign-up') {
				console.log('SIGN-UP: ', values)
				toast.success('Account created successfully. Please sign.')
				router.push('/sign-in')
			} else {
				console.log('SIGN-IN: ', values)
				toast.success('Sign in successfully.')
				router.push('/')

			}
		} catch (error) {
			console.log(error)
			toast.error(`There was an error: ${error}`)
		}
	}

	const isSingIn = type === 'sign-in'

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image
						src={"/logo.svg"}
						alt="logo"
						width={32}
						height={38} />
					<h2 className="text-primary-100">PrepWise</h2>
				</div>
				<h3>Practice job interview with AI</h3>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
						{!isSingIn && (
							<FormField
								control={form.control}
								name="name"
								label="Name"
								placeholder="Your Name"
								type="text"
							/>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							placeholder="Your email adress"
							type="email"
						/>
						<FormField
							control={form.control}
							name="password"
							label="Password"
							placeholder="Enter your password"
							type="password"
						/>
						<Button className="btn" type="submit">{isSingIn ? 'Sing In' : 'Create an Account'}</Button>
					</form>
				</Form>
				<p className="text-center">
					{isSingIn ? 'No account yet?' : 'Have an account already?'}
					<Link href={!isSingIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">{!isSingIn ? 'Sign in' : 'Sign up'}</Link>
				</p>
			</div>
		</div>
	)
}

export default AuthForm