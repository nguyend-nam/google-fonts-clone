import useFetchFonts from 'hooks/fetchFonts'
import { useRouter } from 'next/router'

const FontDetailPage = () => {
  const { query } = useRouter()
  const { data } = useFetchFonts()
  const fontDetails = data?.find(({ family }) => family === query.id)

  if (!fontDetails) {
    return <div>Loading...</div>
  }

  return <div>{JSON.stringify(fontDetails)}</div>
}

export default FontDetailPage
