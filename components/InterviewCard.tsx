import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs'
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/actions/general.actions';
const InterviewCard = async ({ id,
    userId,
    role,
    type,
    techstack,
    createdAt }: InterviewCardProps) => {

    const feedback = userId && id ? await getFeedbackByInterviewId({ interviewId: id, userId }) : null
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

    return (
        <div className='card-border w-[360px] max-sm:w-full min-h-96'>
            <div className="card-interview">
                <div className="">
                    <div className="absolute top-0 right-0 w-fit py-2 px-4 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt='cover' width={90} height={90} className='rounded-full object-fit size-[90px]' />
                    <h3 className="mt-5 capitalize">
                        {role} Entrevista
                    </h3>
                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src={'/calendar.svg'} alt='calendar' width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <Image src={'/star.svg'} alt='star' width={22} height={22} />
                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment || "Aún no has tomado la entrevista. Tómala ahora para mejorar tus habilidades."}
                    </p>
                </div>
                <div className="flex flex-row justify-between">
                    <DisplayTechIcons techStack={techstack} />
                    <Button className='btn-primary'>
                        <Link href={feedback
                            ? `/interview/${id}/feedback`
                            : `/interview/${id}`
                        }>
                            {feedback ? 'Verificar comentarios' : 'Ver Entrevista'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard