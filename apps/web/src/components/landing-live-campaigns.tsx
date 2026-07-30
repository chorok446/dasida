import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/fallback-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { apiGet } from "@/lib/api";
import { progressPercent } from "@/lib/progress";
import { statusMeta, type Campaign, type CampaignSearchResponse } from "@/data/campaigns";

// 랜딩 "설득" 섹션의 근거는 허구 수치가 아니라 지금 모집 중인 실제 캠페인이다.
// SSR 공개 GET(쿠키 없음) + 60초 재검증 — API 가 죽어도 랜딩은 폴백 카피로 완주한다.
// 참여 가능 캠페인을 우선하고, 없으면(시드 날짜 노후 등) 모집중 전체에서 보여준다.
const QUERIES = [
  "/api/campaigns/search?status=open&availableOnly=true&sort=popular&page=0&size=3",
  "/api/campaigns/search?status=open&sort=popular&page=0&size=3",
];

async function fetchLiveCampaigns(): Promise<Campaign[]> {
  for (const query of QUERIES) {
    try {
      const response = await apiGet<CampaignSearchResponse>(query, { revalidate: 60 });
      if (response.content.length > 0) return response.content;
    } catch {
      // 다음 단계 폴백으로
    }
  }
  return [];
}

function CampaignCard({ campaign, featured = false }: { campaign: Campaign; featured?: boolean }) {
  const pct = progressPercent(campaign.joined, campaign.capacity);
  const meta = statusMeta[campaign.status];
  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className={`group flex overflow-hidden rounded-3xl border transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none ${
        featured ? "flex-col" : "flex-row items-stretch"
      }`}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className={featured ? "aspect-[16/9] w-full" : "w-32 shrink-0 sm:w-40"}>
        <FallbackImage
          src={campaign.thumb}
          alt=""
          decorative
          thumbnail={!featured}
          className="h-full w-full object-cover"
        />
      </div>
      <div className={`flex min-w-0 flex-1 flex-col justify-between gap-3 ${featured ? "p-6" : "p-4"}`}>
        <div>
          <span
            className="inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium"
            style={{ background: meta.color, color: meta.fg }}
          >
            {meta.label}
          </span>
          <h3
            className={`mt-2 line-clamp-2 font-semibold group-hover:underline ${
              featured ? "text-[20px]" : "text-[14px]"
            }`}
            style={{ color: "var(--heading)" }}
          >
            {campaign.title}
          </h3>
          {featured && (
            <p className="mt-1 line-clamp-2 text-[14px]" style={{ color: "var(--foreground-muted)" }}>
              {campaign.summary}
            </p>
          )}
        </div>
        <div>
          <div
            className="h-1.5 rounded-full"
            style={{ background: "rgba(var(--ink-rgb), 0.09)" }}
            aria-hidden
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "var(--accent)" }}
            />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: "var(--foreground-muted)" }}>
            {campaign.joined}/{campaign.capacity}명 참여 · {campaign.daysLeftLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}

export async function LandingLiveCampaigns() {
  const campaigns = await fetchLiveCampaigns();
  const [featured, ...rest] = campaigns;

  return (
    <section className="px-8 py-32 transition-colors" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-black-han), sans-serif",
                fontSize: "clamp(40px, 5vw, 72px)",
                color: "var(--foreground)",
              }}
            >
              지금 모집 중인 캠페인
            </h2>
            <p className="mt-4 max-w-2xl" style={{ color: "rgba(var(--ink-rgb), 0.68)" }}>
              말보다 증거 — 지금 다시,다에서 참여자를 기다리는 실제 캠페인입니다.
            </p>
          </div>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-[color:var(--chip-bg)]"
            style={{ borderColor: "rgba(var(--ink-rgb), 0.16)", color: "var(--heading)" }}
          >
            전체 보기 <ArrowRight size={15} aria-hidden />
          </Link>
        </ScrollReveal>

        {featured ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <ScrollReveal className="lg:col-span-3">
              <CampaignCard campaign={featured} featured />
            </ScrollReveal>
            <div className="flex flex-col gap-6 lg:col-span-2">
              {rest.map((campaign, i) => (
                <ScrollReveal key={campaign.id} delay={0.12 + i * 0.12} className="flex-1">
                  <CampaignCard campaign={campaign} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          <ScrollReveal>
            <div
              className="rounded-3xl border p-10 text-center"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p style={{ color: "var(--foreground-muted)" }}>
                지금 모집 중인 캠페인을 불러오지 못했습니다. 캠페인 목록에서 직접 확인해 보세요.
              </p>
              <Link
                href="/campaigns"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-medium"
                style={{ background: "var(--accent)", color: "var(--surface-dark)" }}
              >
                캠페인 둘러보기 <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
