import { NextResponse } from "next/server";

const verifyProof = async (
  proof: any,
  app_id: string,
  action: string = "verify-human"
) => {
  const response = await fetch(
    `https://developer.worldcoin.org/api/v1/verify/${app_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...proof, action: action }),
    }
  );
  if (response.ok) {
    const verified = await response.json();
    return verified;
  } else {
    const { code, detail } = await response.json();
    throw new Error(`Error Code ${code}: ${detail}`);
  }
};

export async function POST(request: Request) {
  const req = await request.json();
  const { proof } = req;
  const app_id = "app_76926e49e7e353006d577f8839a63d5e";
  const action = "cookie-jar-prod";

  const result = await verifyProof(proof, app_id, action);

  if (result.success == true) {
    return NextResponse.json({ verified: true });
  } else {
    return NextResponse.json({ verified: false });
  }
}
