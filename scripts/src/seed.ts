/**
 * Seed script — 1 week of sample video projects (3 per day)
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run seed
 *
 * Safe to re-run: skips seeding if video_projects already has rows.
 */

import { db, pool, videoProjectsTable } from "@workspace/db";
import { count } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TOPICS: Array<{
  title: string;
  topic: string;
  hookDate: string;
  hookYear: string;
  scene2Headline: string;
  scene2Subline: string;
  scene3Headline: string;
  scene3Body: string;
  scene4Headline: string;
  scene4Body: string;
  scene5Headline: string;
  scene5Body: string;
  scene6Cta: string;
  status: "draft" | "review" | "approved" | "scheduled" | "published";
  /** Days before today this project was created (0 = today) */
  daysAgo: number;
}> = [
  // ── Day 1 (6 days ago) ──────────────────────────────────────────────────
  {
    title: "The Battle of Agincourt",
    topic: "Agincourt 1415",
    hookDate: "October 25",
    hookYear: "1415",
    scene2Headline: "English archers vs French cavalry",
    scene2Subline: "5,000 vs 20,000",
    scene3Headline: "The longbow dominates",
    scene3Body:
      "English longbowmen fired 12 arrows per minute, decimating the French advance.",
    scene4Headline: "A stunning victory",
    scene4Body:
      "Henry V's outnumbered army routed the French nobility in under three hours.",
    scene5Headline: "Legacy",
    scene5Body:
      "Agincourt became a symbol of English resolve and changed medieval warfare forever.",
    scene6Cta: "Follow for daily history reels",
    status: "published",
    daysAgo: 6,
  },
  {
    title: "The Black Death Arrives in England",
    topic: "Black Death 1348",
    hookDate: "June",
    hookYear: "1348",
    scene2Headline: "A plague sweeps the continent",
    scene2Subline: "One third of Europe would die",
    scene3Headline: "Ports overwhelmed",
    scene3Body:
      "Infected ships docked at English ports, bringing rats and fleas carrying Yersinia pestis.",
    scene4Headline: "Society collapses",
    scene4Body:
      "Villages emptied. Priests refused last rites. Bodies piled in the streets.",
    scene5Headline: "The aftermath",
    scene5Body:
      "England lost half its population — and peasants who survived gained unprecedented power.",
    scene6Cta: "Follow for daily history reels",
    status: "published",
    daysAgo: 6,
  },
  {
    title: "The Magna Carta is Signed",
    topic: "Magna Carta 1215",
    hookDate: "June 15",
    hookYear: "1215",
    scene2Headline: "Barons force the king's hand",
    scene2Subline: "Runnymede, River Thames",
    scene3Headline: "No man above the law",
    scene3Body:
      "For the first time, an English king acknowledged his power was not absolute.",
    scene4Headline: "63 clauses",
    scene4Body:
      "The document limited royal power and guaranteed the rights of free men — a foundation for democracy.",
    scene5Headline: "Living document",
    scene5Body:
      "Three clauses of the Magna Carta remain law in England to this day.",
    scene6Cta: "Follow for daily history reels",
    status: "published",
    daysAgo: 6,
  },

  // ── Day 2 (5 days ago) ──────────────────────────────────────────────────
  {
    title: "The Norman Conquest",
    topic: "Norman Conquest 1066",
    hookDate: "October 14",
    hookYear: "1066",
    scene2Headline: "William crosses the Channel",
    scene2Subline: "700 ships, 7,000 men",
    scene3Headline: "The Battle of Hastings",
    scene3Body:
      "King Harold is struck by an arrow — England's fate changes in an instant.",
    scene4Headline: "A new ruling class",
    scene4Body:
      "French-speaking Normans replaced Anglo-Saxon nobility. The English language would never be the same.",
    scene5Headline: "Domesday Book",
    scene5Body:
      "William ordered a complete survey of his new kingdom — the most detailed census of medieval Europe.",
    scene6Cta: "Follow for daily history reels",
    status: "published",
    daysAgo: 5,
  },
  {
    title: "Henry VIII's Six Wives",
    topic: "Henry VIII marriages",
    hookDate: "1509",
    hookYear: "1509",
    scene2Headline: "A king obsessed with an heir",
    scene2Subline: "Six wives. Two beheaded.",
    scene3Headline: "Catherine of Aragon",
    scene3Body:
      "His first wife, rejected after 20 years. Their divorce triggered the English Reformation.",
    scene4Headline: "Anne Boleyn",
    scene4Body:
      "Executed on fabricated charges of adultery. Their daughter became Elizabeth I.",
    scene5Headline: "A kingdom reshaped",
    scene5Body:
      "Henry's personal obsessions rewrote religion, law, and power in England forever.",
    scene6Cta: "Follow for daily history reels",
    status: "published",
    daysAgo: 5,
  },
  {
    title: "The Great Fire of London",
    topic: "Great Fire 1666",
    hookDate: "September 2",
    hookYear: "1666",
    scene2Headline: "A baker's oven starts an inferno",
    scene2Subline: "Pudding Lane, 2am",
    scene3Headline: "Four days of fire",
    scene3Body:
      "13,000 houses, 87 churches, and St Paul's Cathedral reduced to ash.",
    scene4Headline: "Miraculously few deaths",
    scene4Body:
      "Only 6 confirmed deaths — but 80,000 people left homeless in London's deadliest fire.",
    scene5Headline: "Rebuilding the city",
    scene5Body:
      "Christopher Wren redesigned St Paul's and 50 churches. Modern London was born in the ashes.",
    scene6Cta: "Follow for daily history reels",
    status: "approved",
    daysAgo: 5,
  },

  // ── Day 3 (4 days ago) ──────────────────────────────────────────────────
  {
    title: "The Mary Rose Sinks",
    topic: "Mary Rose 1545",
    hookDate: "July 19",
    hookYear: "1545",
    scene2Headline: "Henry VIII's flagship capsizes",
    scene2Subline: "Portsmouth Harbour",
    scene3Headline: "A ship overloaded with cannon",
    scene3Body:
      "The Mary Rose heeled sharply, water flooded through open gunports, and she sank in minutes.",
    scene4Headline: "500 men lost",
    scene4Body:
      "Almost the entire crew perished. Henry VIII watched from the shore as his greatest warship went under.",
    scene5Headline: "Raised after 437 years",
    scene5Body:
      "In 1982, the Mary Rose was lifted from the seabed — the most complex marine salvage in history.",
    scene6Cta: "Follow for daily history reels",
    status: "approved",
    daysAgo: 4,
  },
  {
    title: "The Spanish Armada",
    topic: "Spanish Armada 1588",
    hookDate: "July 29",
    hookYear: "1588",
    scene2Headline: "130 ships sail for England",
    scene2Subline: "Philip II's plan to invade",
    scene3Headline: "Drake plays bowls",
    scene3Body:
      "Sir Francis Drake reportedly finished his game before sailing to meet the Armada — calm in the face of invasion.",
    scene4Headline: "Storms finish what Drake started",
    scene4Body:
      "English fire ships scattered the fleet. Atlantic storms destroyed half of Spain's navy.",
    scene5Headline: "Elizabeth I's finest hour",
    scene5Body:
      "Her speech at Tilbury became one of history's greatest war orations. England stood unconquered.",
    scene6Cta: "Follow for daily history reels",
    status: "review",
    daysAgo: 4,
  },
  {
    title: "The English Civil War",
    topic: "English Civil War 1642",
    hookDate: "August 22",
    hookYear: "1642",
    scene2Headline: "King vs Parliament",
    scene2Subline: "A nation divided",
    scene3Headline: "Roundheads vs Cavaliers",
    scene3Body:
      "Parliament's New Model Army, led by Oliver Cromwell, proved a disciplined force like England had never seen.",
    scene4Headline: "The king is executed",
    scene4Body:
      "Charles I was beheaded outside Banqueting House on January 30, 1649 — a king tried and killed by his own people.",
    scene5Headline: "The Commonwealth",
    scene5Body:
      "England briefly became a republic under Cromwell, before the monarchy was restored in 1660.",
    scene6Cta: "Follow for daily history reels",
    status: "review",
    daysAgo: 4,
  },

  // ── Day 4 (3 days ago) ──────────────────────────────────────────────────
  {
    title: "The Gunpowder Plot",
    topic: "Gunpowder Plot 1605",
    hookDate: "November 5",
    hookYear: "1605",
    scene2Headline: "Thirty-six barrels of gunpowder",
    scene2Subline: "Hidden under the House of Lords",
    scene3Headline: "Guy Fawkes is caught",
    scene3Body:
      "A tip-off letter led guards to the cellar where Fawkes waited to ignite the fuse.",
    scene4Headline: "Torture and confession",
    scene4Body:
      "Fawkes endured days of torture before naming his co-conspirators. All were executed.",
    scene5Headline: "Bonfire Night",
    scene5Body:
      "Every November 5, Britain still burns effigies and fires rockets — remembering the plot that nearly erased Parliament.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 3,
  },
  {
    title: "The Dissolution of the Monasteries",
    topic: "Dissolution 1536",
    hookDate: "1536",
    hookYear: "1536",
    scene2Headline: "Henry VIII seizes the church",
    scene2Subline: "800 monasteries closed",
    scene3Headline: "Wealth transferred to the Crown",
    scene3Body:
      "Monks and nuns were expelled. Priceless manuscripts were scattered or destroyed.",
    scene4Headline: "The Pilgrimage of Grace",
    scene4Body:
      "Northern England rose in revolt — 40,000 marched to restore Catholic practice. Henry crushed them brutally.",
    scene5Headline: "England changed forever",
    scene5Body:
      "The land, buildings, and power of the medieval church passed to the Crown and new Protestant gentry.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 3,
  },
  {
    title: "Boudicca's Revolt",
    topic: "Boudicca 60 AD",
    hookDate: "60 AD",
    hookYear: "60",
    scene2Headline: "A queen rises against Rome",
    scene2Subline: "The Iceni tribe strikes back",
    scene3Headline: "London burns",
    scene3Body:
      "Boudicca's forces destroyed Camulodunum, Londinium, and Verulamium — killing 70,000 Romans.",
    scene4Headline: "Rome strikes back",
    scene4Body:
      "Governor Paulinus marched south. Despite being outnumbered 10 to 1, Roman discipline crushed the revolt.",
    scene5Headline: "Boudicca's legacy",
    scene5Body:
      "She became a symbol of British resistance — her statue stands on the Thames Embankment to this day.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 3,
  },

  // ── Day 5 (2 days ago) ──────────────────────────────────────────────────
  {
    title: "The Princes in the Tower",
    topic: "Princes in the Tower 1483",
    hookDate: "1483",
    hookYear: "1483",
    scene2Headline: "Two boys vanish from the Tower",
    scene2Subline: "Edward V was 12 years old",
    scene3Headline: "Richard III takes the throne",
    scene3Body:
      "The young king and his brother were declared illegitimate. They were never seen again.",
    scene4Headline: "Who ordered their deaths?",
    scene4Body:
      "Richard III, Henry Stafford, and even Henry VII have all been blamed — the truth remains unknown.",
    scene5Headline: "The mystery endures",
    scene5Body:
      "Bones discovered in the Tower in 1674 may belong to the princes. DNA testing has never been permitted.",
    scene6Cta: "Follow for daily history reels",
    status: "scheduled",
    daysAgo: 2,
  },
  {
    title: "The Industrial Revolution Begins",
    topic: "Industrial Revolution 1760",
    hookDate: "1760",
    hookYear: "1760",
    scene2Headline: "Britain invents the modern world",
    scene2Subline: "Steam. Coal. Iron.",
    scene3Headline: "James Watt's steam engine",
    scene3Body:
      "Watt's improved condenser engine turned heat into mechanical power — and changed everything.",
    scene4Headline: "Children in the mills",
    scene4Body:
      "Six-year-olds worked 14-hour shifts in dangerous factories. The price of progress was paid in lives.",
    scene5Headline: "The world transformed",
    scene5Body:
      "Britain's GDP doubled in 60 years. The factory replaced the farm as the engine of human civilization.",
    scene6Cta: "Follow for daily history reels",
    status: "scheduled",
    daysAgo: 2,
  },
  {
    title: "The Abolition of Slavery",
    topic: "Abolition 1807",
    hookDate: "March 25",
    hookYear: "1807",
    scene2Headline: "Parliament votes to end the slave trade",
    scene2Subline: "After 20 years of campaigning",
    scene3Headline: "William Wilberforce's crusade",
    scene3Body:
      "Wilberforce introduced the Abolition Bill every year for 18 years before it finally passed.",
    scene4Headline: "3.1 million already transported",
    scene4Body:
      "The Act stopped new transatlantic slaving — but existing enslaved people in the colonies remained enslaved for 26 more years.",
    scene5Headline: "Full abolition 1833",
    scene5Body:
      "The Slavery Abolition Act freed 800,000 people. Slave owners received £20 million in compensation.",
    scene6Cta: "Follow for daily history reels",
    status: "scheduled",
    daysAgo: 2,
  },

  // ── Day 6 (1 day ago) ───────────────────────────────────────────────────
  {
    title: "The Charge of the Light Brigade",
    topic: "Light Brigade 1854",
    hookDate: "October 25",
    hookYear: "1854",
    scene2Headline: "A disastrous order",
    scene2Subline: "Balaclava, Crimea",
    scene3Headline: "Into the valley of death",
    scene3Body:
      "673 cavalrymen charged a mile of Russian guns. 278 were killed or wounded in 20 minutes.",
    scene4Headline: "A catastrophic miscommunication",
    scene4Body:
      "Lord Raglan's vague order sent the Light Brigade charging the wrong guns entirely.",
    scene5Headline: "Immortalised in verse",
    scene5Body:
      "Tennyson's poem was published six weeks later: 'Theirs not to reason why, theirs but to do and die.'",
    scene6Cta: "Follow for daily history reels",
    status: "review",
    daysAgo: 1,
  },
  {
    title: "The Suffragette Movement",
    topic: "Suffragettes 1903",
    hookDate: "1903",
    hookYear: "1903",
    scene2Headline: "Women demand the vote",
    scene2Subline: "Emmeline Pankhurst founds the WSPU",
    scene3Headline: "Deeds not words",
    scene3Body:
      "Suffragettes chained themselves to railings, smashed windows, and went on hunger strike in prison.",
    scene4Headline: "Emily Davison",
    scene4Body:
      "In 1913, she stepped in front of the King's horse at the Epsom Derby and died four days later.",
    scene5Headline: "Victory in 1918",
    scene5Body:
      "Women over 30 won the vote after WWI. Full equal suffrage came a decade later, in 1928.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 1,
  },
  {
    title: "The Battle of Britain",
    topic: "Battle of Britain 1940",
    hookDate: "July 10",
    hookYear: "1940",
    scene2Headline: "The RAF stands alone",
    scene2Subline: "Summer 1940",
    scene3Headline: "The Few",
    scene3Body:
      "Just 2,945 RAF pilots defended Britain against the Luftwaffe's 2,500 aircraft. Churchill called them 'The Few'.",
    scene4Headline: "Radar changes everything",
    scene4Body:
      "Britain's Chain Home radar system gave pilots vital minutes of warning. Germany had nothing comparable.",
    scene5Headline: "Hitler cancels Operation Sea Lion",
    scene5Body:
      "The Luftwaffe failed to break the RAF. Hitler postponed invasion indefinitely — Britain survived.",
    scene6Cta: "Follow for daily history reels",
    status: "approved",
    daysAgo: 1,
  },

  // ── Day 7 (today) ───────────────────────────────────────────────────────
  {
    title: "The Peasants' Revolt",
    topic: "Peasants Revolt 1381",
    hookDate: "June 1381",
    hookYear: "1381",
    scene2Headline: "The first popular uprising in English history",
    scene2Subline: "Led by Wat Tyler",
    scene3Headline: "London falls to the rebels",
    scene3Body:
      "Peasants stormed the Tower of London, killed the Archbishop of Canterbury, and burned John of Gaunt's palace.",
    scene4Headline: "Richard II faces the mob",
    scene4Body:
      "The 14-year-old king rode out to meet 100,000 rebels at Smithfield and promised reform.",
    scene5Headline: "Betrayal",
    scene5Body:
      "Wat Tyler was killed in front of the crowd. The king's promises were broken. Revolt leaders were executed.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 0,
  },
  {
    title: "The Act of Union 1707",
    topic: "Act of Union 1707",
    hookDate: "May 1",
    hookYear: "1707",
    scene2Headline: "England and Scotland become one",
    scene2Subline: "The Kingdom of Great Britain",
    scene3Headline: "Scotland votes yes",
    scene3Body:
      "The Scottish Parliament voted itself out of existence — amid accusations of bribery from Westminster.",
    scene4Headline: "One parliament, one monarch",
    scene4Body:
      "Scotland kept its own law, church, and education — but sent MPs to Westminster for the first time.",
    scene5Headline: "Lasting Union",
    scene5Body:
      "The Union endured wars, empire, and revolution. It remains contested to this day.",
    scene6Cta: "Follow for daily history reels",
    status: "review",
    daysAgo: 0,
  },
  {
    title: "The Execution of Mary Queen of Scots",
    topic: "Mary Queen of Scots 1587",
    hookDate: "February 8",
    hookYear: "1587",
    scene2Headline: "Elizabeth I signs the death warrant",
    scene2Subline: "19 years of imprisonment",
    scene3Headline: "Three blows of the axe",
    scene3Body:
      "The first blow missed. The second severed her spine. A third was needed. She died aged 44.",
    scene4Headline: "Her dog refused to leave",
    scene4Body:
      "Mary's small dog had hidden under her skirts during the execution. Guards found it sheltering beside her body.",
    scene5Headline: "Son becomes king of England",
    scene5Body:
      "Her son James VI of Scotland became James I of England — uniting the two crowns 16 years later.",
    scene6Cta: "Follow for daily history reels",
    status: "draft",
    daysAgo: 0,
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Guard: skip if data already exists
  const [{ value: existing }] = await db
    .select({ value: count() })
    .from(videoProjectsTable);

  if (existing > 0) {
    console.log(
      `⏭  Skipping seed — ${existing} video project(s) already exist.`,
    );
    await pool.end();
    return;
  }

  const now = new Date();

  const rows = TOPICS.map((t, i) => {
    const createdAt = new Date(now);
    createdAt.setDate(createdAt.getDate() - t.daysAgo);
    // Spread 3 items across the day: 08:00, 12:00, 16:00
    createdAt.setHours(8 + (i % 3) * 4, 0, 0, 0);

    const isPublished = t.status === "published";
    const isScheduled = t.status === "scheduled" || isPublished;

    return {
      title: t.title,
      topic: t.topic,
      hookDate: t.hookDate,
      hookYear: t.hookYear,
      scene2Headline: t.scene2Headline,
      scene2Subline: t.scene2Subline,
      scene3Headline: t.scene3Headline,
      scene3Body: t.scene3Body,
      scene4Headline: t.scene4Headline,
      scene4Body: t.scene4Body,
      scene5Headline: t.scene5Headline,
      scene5Body: t.scene5Body,
      scene6Cta: t.scene6Cta,
      status: t.status,
      scheduledAt: isScheduled ? createdAt : null,
      publishedAt: isPublished ? createdAt : null,
      version: 1,
      createdAt,
      updatedAt: createdAt,
    };
  });

  await db.insert(videoProjectsTable).values(rows);

  console.log(`✅ Seeded ${rows.length} video projects (7 days × 3/day).`);
  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
