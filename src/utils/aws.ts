import {
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.NEXT_PUBLIC_AWS_REGION! },
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID!,
  }),
});

export const createPresignedUrlWithClient = ({ bucket, key }: {
  bucket: string;
  key: string;
}) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}