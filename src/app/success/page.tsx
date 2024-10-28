import { Check, Home } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto my-4 bg-green-300 text-green-800 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Check className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Pembayaran Berhasil!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Terima kasih atas pembelian Anda. Pesanan Anda telah dikonfirmasi dan sedang diproses.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href={"/"} className="w-full flex justify-center p-2 items-center rounded-sm text-white bg-black">
            <Home className="mr-2 h-4 w-4" /> Kembali ke Beranda
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}