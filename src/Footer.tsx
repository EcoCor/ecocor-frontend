interface Props {
  apiVersion: string;
  frontendVersion: string;
  existVersion: string;
}

export default function Footer({
  apiVersion,
  frontendVersion,
  existVersion,
}: Props) {
  return (
    <div className="pt-8 pb-6 text-center">
      <small className="opacity-45">
        EcoCor API: {apiVersion}, EcoCor Frontend: {frontendVersion}, eXist:{' '}
        {existVersion}
      </small>
    </div>
  );
}
