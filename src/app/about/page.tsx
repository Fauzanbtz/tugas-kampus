import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Component() {
  return (
    <div className="w-full">
      <Navbar />
      <section className="bg-primary text-white py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">Tentang Kami</h1>
            <p className=" text-lg md:text-xl">
              Kami adalah perusahaan e-commerce yang berkomitmen untuk
              menyediakan pengalaman belanja online yang luar biasa bagi
              pelanggan kami. Dengan visi untuk menjadi platform terkemuka di
              industri ini, kami terus berinovasi dan mengembangkan solusi yang
              memudahkan hidup Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Visi</h2>
              <p className="">
                Menjadi platform e-commerce terpercaya yang menyediakan
                produk-produk berkualitas dan layanan terbaik bagi pelanggan.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Misi</h2>
              <p className="">
                Kami bertekad untuk terus berinovasi, memperluas jangkauan, dan
                memberikan pengalaman belanja online yang menyenangkan bagi
                semua orang.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid gap-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">Tim Kami</h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Kami adalah sekelompok profesional yang berdedikasi untuk
                memberikan yang terbaik bagi pelanggan kami.
              </p>
            </div>
            <div className="flex flex-wrap justify-around">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                  <AvatarFallback>MF</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Fauzan</h3>
                  <p className="text-muted-foreground">CEO</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Arkhan</h3>
                  <p className="text-muted-foreground">BABU</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Khanif</h3>
                  <p className="text-muted-foreground">PEMBANTU</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Tami</h3>
                  <p className="text-muted-foreground">PENADAH</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Abay</h3>
                  <p className="text-muted-foreground">STAFF</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Niko</h3>
                  <p className="text-muted-foreground">STAFF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-300 py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Proses Bisnis</h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Kami memiliki proses bisnis yang efisien dan transparan untuk
              memberikan pengalaman belanja yang luar biasa bagi pelanggan.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pemesanan</h3>
              <p className="text-muted-foreground">
                Pelanggan dapat dengan mudah memesan produk melalui platform
                kami yang user-friendly. Kami memastikan proses pemesanan yang
                cepat dan aman.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pengiriman</h3>
              <p className="text-muted-foreground">
                Kami bekerja sama dengan mitra logistik terpercaya untuk
                memastikan pengiriman yang cepat dan aman ke seluruh Indonesia.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Layanan Pelanggan</h3>
              <p className="text-muted-foreground">
                Tim kami yang berpengalaman siap membantu Anda kapan pun Anda
                membutuhkan. Kami berkomitmen untuk memberikan layanan terbaik.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Pengembalian</h3>
              <p className="text-muted-foreground">
                Kami memahami bahwa kadang-kadang produk tidak sesuai dengan
                harapan. Oleh karena itu, kami menyediakan proses pengembalian
                yang mudah dan cepat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Nilai-Nilai Kami</h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Nilai-nilai kami menjadi landasan dalam setiap keputusan dan
              tindakan kami.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Integritas</h3>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk selalu bersikap jujur, etis, dan
                transparan dalam setiap interaksi dengan pelanggan.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Inovasi</h3>
              <p className="text-muted-foreground">
                Kami terus berinovasi untuk mengembangkan solusi yang lebih baik
                dan memberikan pengalaman belanja yang lebih menyenangkan.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Kepuasan Pelanggan</h3>
              <p className="text-muted-foreground">
                Kepuasan pelanggan adalah prioritas utama kami. Kami berusaha
                keras untuk memenuhi kebutuhan dan harapan mereka.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Tanggung Jawab Sosial</h3>
              <p className="text-muted-foreground">
                Kami berkomitmen untuk menjalankan bisnis kami dengan cara yang
                bertanggung jawab secara sosial dan lingkungan.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
