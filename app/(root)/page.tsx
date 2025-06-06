import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = async () => {
  const user = await getCurrentUser()

  //Pararell fetching
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ])


  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Prepárate para entrevistas con práctica y retroalimentación impulsadas por IA</h2>
          <p className="text-lg">Practica con preguntas reales de entrevistas y recibe retroalimentación instantánea</p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href={'/interview'}>Iniciar una entrevista</Link>
          </Button>
        </div>
        <Image src={'/robot.png'} alt='robot' width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Tus Entrevistas</h2>
        <div className="interviews-section">
          {
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))) : (
              <p>Aún no has realizado ninguna entrevista</p>
            )
          }

        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Toma una entrevista</h2>
        <div className="interviews-section">
          {
            hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))) : (
              <p>No hay entrevistas disponibles</p>
            )
          }
        </div>
      </section>
    </>
  )
}

export default Home