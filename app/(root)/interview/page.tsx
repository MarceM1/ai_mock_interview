import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import React from 'react'

const Page =async () => {
    const user = await getCurrentUser()
    console.log('user: ', user)
  return (
    <>
        <h3>Generación de entrevistas</h3>
        <Agent userName={user!.name} userId={user?.id} type='generate'/>
    </>
)
}

export default Page