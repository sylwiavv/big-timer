import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ISearchParamsProps {
  hours: number;
  minutes?: number;
  seconds?: number;
  target?: number;
}

const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const updateSearchParams = ({
    hours,
    minutes,
    seconds,
    target,
  }: ISearchParamsProps) => {
    hours > 0 ? params.set('hours', hours.toString()) : params.delete('hours');

    minutes && minutes > 0
      ? params.set('minutes', minutes.toString())
      : params.delete('minutes');

    seconds && seconds > 0
      ? params.set('seconds', seconds.toString())
      : params.delete('seconds');

    target ? params.set('target', target.toString()) : params.delete('target');

    router.push(`${pathname}?${params.toString()}`);
  };

  const getValuesFromSearchParams = () => {
    if (params.size === 0) return null;

    return {
      hours: Number(params.get('hours')) || 0,
      minutes: Number(params.get('minutes')) || 0,
      seconds: Number(params.get('seconds')) || 0,
      target: params.has('target') ? Number(params.get('target')) : undefined,
    };
  };

  return { updateSearchParams, getValuesFromSearchParams };
};
export default useUpdateSearchParams;
